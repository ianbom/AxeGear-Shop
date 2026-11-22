import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const source = readFileSync(new URL('../resources/js/contexts/checkout-context.tsx', import.meta.url), 'utf8');
const parsed = ts.createSourceFile('checkout-context.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let callback;
function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(parsed) === 'placeOrder') {
        callback = node.initializer.arguments[0];
    }

    ts.forEachChild(node, visit);
}
visit(parsed);
assert.ok(callback);
const compiled = ts.transpileModule(`const placeOrder = ${callback.getText(parsed)};`, {
    compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;

for (const [response, expected] of [
    [{ redirect_url: 'https://sandbox.doku.com/pay' }, 'https://sandbox.doku.com/pay'],
    [{ redirect_url: null }, '/my-order'],
    [null, null],
]) {
    const removed = [];
    const placeOrder = runInNewContext(`${compiled}\nplaceOrder`, {
        placingOrder: false,
        currentAddressId: 1,
        currentRate: { id: 'rate-1' },
        currentVoucher: null,
        checkoutIdempotencyKey: () => 'stable-key',
        placeOrderRoute: { url: () => '/checkout/place-order' },
        myOrder: { url: () => '/my-order' },
        setPlacingOrder() {},
        setErrors() {},
        jsonRequest: async (url, method, body) => {
            assert.equal(body.payment_method, 'qris');

            if (!response) {
                throw { payment: 'uncertain' };
            }

            return response;
        },
        window: { sessionStorage: { removeItem: (key) => removed.push(key) } },
    });
    assert.equal(await placeOrder('', true), expected);
    assert.equal(removed.length, response ? 1 : 0, 'A lost response must retain the idempotency key');
}

// Catch lost validation messages: run the real request parser, not a parser stub.
const requestNode = parsed.statements.find(
    (node) => ts.isFunctionDeclaration(node) && node.name.text === 'jsonRequest',
);
assert.ok(requestNode);
const requestCode = ts.transpileModule(requestNode.getText(parsed), {
    compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;

for (const [payload, expected, retryAllowed = false, status = 422] of [
    [{ errors: { payment: ['Konfigurasi DOKU belum lengkap.', 'Detail lain.'] } }, { payment: 'Konfigurasi DOKU belum lengkap.' }],
    [{ errors: { shipping_rate_id: ['Pilih ulang ongkir.'] } }, { shipping_rate_id: 'Pilih ulang ongkir.' }],
    [{ errors: { checkout: 'Periksa pesanan.' } }, { checkout: 'Periksa pesanan.' }],
    [{ message: 'Request ditolak.' }, { checkout: 'Request ditolak.' }],
    [{ errors: { payment: ['QRIS belum aktif.'] }, retry_allowed: true }, { payment: 'QRIS belum aktif.' }, true],
    [{ errors: { payment: ['Gagal.'] }, retry_allowed: 'true' }, { payment: 'Gagal.' }],
    [{ errors: { payment: ['Gagal.'] }, retry_allowed: true }, { payment: 'Gagal.' }, false, 500],
]) {
    const removed = [];
    const jsonRequest = runInNewContext(`${requestCode}\njsonRequest`, {
        csrfHeaders: () => ({}),
        fetch: async () => ({ ok: false, status, json: async () => payload }),
        window: { sessionStorage: { removeItem: (key) => removed.push(key) } },
    });
    const states = [];
    const placeOrder = runInNewContext(`${compiled}\nplaceOrder`, {
        placingOrder: false,
        currentAddressId: 1,
        currentRate: { id: 'rate-1' },
        currentVoucher: null,
        checkoutIdempotencyKey: () => 'stable-key',
        placeOrderRoute: { url: () => '/checkout/place-order' },
        setPlacingOrder() {},
        setErrors: (errors) => states.push(errors),
        jsonRequest,
        window: { sessionStorage: { removeItem: (key) => removed.push(key) } },
    });
    assert.equal(await placeOrder('', true), null);
    assert.deepEqual(JSON.parse(JSON.stringify(states.at(-1))), expected);
    assert.equal(removed.length, retryAllowed ? 1 : 0, 'Only definitive checkout rejection allows a fresh key');
}

// Catch hidden validation messages: render the actual conditional JSX blocks.
const page = ts.createSourceFile('checkout.tsx', readFileSync(
    new URL('../resources/js/pages/customer/checkout/checkout.tsx', import.meta.url), 'utf8',
), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

for (const field of ['payment', 'payment_method', 'shipping_rate_id']) {
    let expression;
    function locate(node) {
        if (ts.isJsxExpression(node) && node.expression &&
            ts.isBinaryExpression(node.expression) &&
            node.expression.left.getText(page) === `errors.${field}`) {
            expression = node.expression;
        }

        ts.forEachChild(node, locate);
    }
    locate(page);
    assert.ok(expression, `${field} validation must be visible`);
    const code = ts.transpileModule(`const view = (${expression.getText(page)});`, {
        compilerOptions: { target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS },
    }).outputText;
    const render = (errors) => renderToStaticMarkup(runInNewContext(`${code}\nview`, {
        exports: {}, require: () => jsxRuntime, errors,
    }));
    assert.match(render({ [field]: 'Pesan validasi' }), /role="alert"[^>]*>Pesan validasi<\/p>/);
    assert.equal(render({}), '');
}

assert.doesNotMatch(page.text, /paymentType|selectedBank|Virtual Account|payment-bank/);
console.log('QRIS checkout redirect, validation display and retry checks passed');
