import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import React from 'react';
import ts from 'typescript';

const source = readFileSync(
    new URL(
        '../resources/js/pages/admin/products/shipping-estimate.tsx',
        import.meta.url,
    ),
    'utf8',
);
const parsed = ts.createSourceFile(
    'estimate.tsx',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
);
const declarations = parsed.statements
    .filter((statement) => !ts.isImportDeclaration(statement))
    .map((statement) =>
        statement
            .getText(parsed)
            .replace('export default function', 'function'),
    )
    .join('\n');
const compiled = ts.transpileModule(declarations, {
    compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2022 },
}).outputText;
const state = [];
const timers = new Map();
const requests = [];
let cursor = 0;
let timerId = 0;
let previousDependencies;
let cleanup;
let pendingEffect;
let props = { weight: '', length: '', width: '', height: '' };
const context = {
    React,
    AbortController,
    Error,
    Number,
    Intl,
    Button: 'button',
    document: { cookie: 'XSRF-TOKEN=test%20token' },
    shippingEstimate: { url: () => '/admin/products/shipping-estimate' },
    setTimeout(callback, delay) {
        assert.equal(delay, 800);
        timers.set(++timerId, callback);
        return timerId;
    },
    clearTimeout(identifier) {
        timers.delete(identifier);
    },
    useState(initial) {
        const index = cursor++;
        if (!(index in state)) state[index] = initial;
        return [
            state[index],
            (value) => {
                state[index] =
                    typeof value === 'function' ? value(state[index]) : value;
            },
        ];
    },
    useEffect(callback, dependencies) {
        if (
            !previousDependencies ||
            dependencies.some(
                (value, index) => value !== previousDependencies[index],
            )
        ) {
            previousDependencies = dependencies;
            pendingEffect = callback;
        }
    },
    fetch(url, options) {
        assert.equal(url, '/admin/products/shipping-estimate');
        return new Promise((resolve) => requests.push({ options, resolve }));
    },
};
runInNewContext(
    compiled + '\nthis.component = ProductShippingEstimate;',
    context,
);

function render(nextProps = props) {
    props = nextProps;
    cursor = 0;
    const tree = context.component(props);
    if (pendingEffect) {
        cleanup?.();
        const effect = pendingEffect;
        pendingEffect = null;
        cleanup = effect();
    }
    return tree;
}

function text(node) {
    if (Array.isArray(node)) return node.map(text).join(' ');
    if (React.isValidElement(node)) return text(node.props.children);
    return typeof node === 'string' || typeof node === 'number'
        ? String(node)
        : '';
}

function nodes(node) {
    if (Array.isArray(node)) return node.flatMap(nodes);
    return React.isValidElement(node)
        ? [node, ...nodes(node.props.children)]
        : [];
}

function tick() {
    const scheduled = [...timers.values()];
    timers.clear();
    scheduled.forEach((callback) => callback());
}

async function respond(request, payload, status = 200) {
    request.resolve({ ok: status === 200, status, json: async () => payload });
    for (let index = 0; index < 10; index++) await Promise.resolve();
}

assert.match(text(render()), /Isi berat/);
assert.equal(timers.size, 0);
const dimensions = { weight: 500, length: 20, width: 15, height: 10 };
render(dimensions);
render({ ...dimensions, weight: 600 });
assert.equal(timers.size, 1);
assert.equal(requests.length, 0);
tick();
assert.match(text(render()), /Menghitung/);
assert.deepEqual(JSON.parse(requests[0].options.body), {
    ...dimensions,
    weight: 600,
});
assert.equal(requests[0].options.headers['X-XSRF-TOKEN'], 'test token');
const rate = {
    id: 'jne-reg',
    courier_company: 'jne',
    courier_type: 'reg',
    courier_service_name: 'REG',
    duration: '1-2 hari',
    price: 12000,
};
render({ ...dimensions, weight: 700 });
assert.equal(requests[0].options.signal.aborted, true);
tick();
await respond(requests[1], { rates: [rate] });
assert.match(text(render()), /JNE/);
await respond(requests[0], { rates: [{ ...rate, courier_company: 'stale' }] });
assert.doesNotMatch(text(render()), /STALE/);
assert.match(text(render()), /JNE/);
assert.match(text(render({ ...dimensions, height: '' })), /Isi berat/);
assert.doesNotMatch(text(render()), /JNE/);
assert.equal(timers.size, 0);
render(dimensions);
tick();
await respond(
    requests[2],
    { errors: { shipping: ['Koordinat toko belum valid.'] } },
    422,
);
assert.match(text(render()), /Koordinat toko belum valid/);
const retryButton = nodes(render()).find((node) => node.type === 'button');
assert.equal(retryButton.props.type, 'button');
retryButton.props.onClick();
render();
tick();
await respond(requests[3], { rates: [] });
assert.match(text(render()), /Tidak ada layanan/);
render({ ...dimensions, weight: 501 });
tick();
await respond(requests[4], {}, 429);
assert.match(text(render()), /Tunggu satu menit/);
cleanup?.();
console.log('Product shipping estimate checks passed.');
