import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = readFileSync(
    new URL('../resources/js/contexts/checkout-context.tsx', import.meta.url),
    'utf8',
);
const parsed = ts.createSourceFile(
    'checkout-context.tsx',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
);
const helper = parsed.statements.find(
    (statement) =>
        ts.isFunctionDeclaration(statement) &&
        statement.name?.text === 'shippingSummary',
);
assert.ok(helper);
const compiled = ts.transpileModule(helper.getText(parsed), {
    compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;
const shippingSummary = runInNewContext(`${compiled}\nshippingSummary`);

for (const [subtotal, discount, shipping, expected] of [
    [100001, 10000.1, 20000, 110001],
    [100001, 10000.1, 0, 90001],
    [10, 0.5, 0, 10],
    [10, 0.51, 0, 9],
    [100000, 10000, 16000, 106000],
]) {
    const summary = shippingSummary(
        { item_count: 1, subtotal, discount, service_fee: 0, total: 0 },
        shipping,
    );
    assert.equal(summary.total, expected);
    assert.equal(summary.shipping, shipping);
    assert.equal(
        summary.rounding_adjustment,
        Math.round(
            (expected - Math.max(0, subtotal + shipping - discount)) * 100,
        ) / 100,
    );
}

console.log('Checkout rounding checks passed');
