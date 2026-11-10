import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import React from 'react';
import ts from 'typescript';

const source = readFileSync(new URL('../resources/js/pages/admin/orders/show.tsx', import.meta.url), 'utf8');
const parsed = ts.createSourceFile('show.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const paymentTab = parsed.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === 'PaymentTab');
const code = ts.transpileModule(paymentTab.getText(parsed), {
    compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2022 },
}).outputText;
const PaymentTab = runInNewContext(code + '\nPaymentTab;', {
    React, useState: (value) => [value, () => {}],
    Panel: 'section', PanelTitle: 'h2', Link: 'a', Button: 'button',
    Detail: 'detail', InlineStatus: 'status', ActivityList: 'activity', Empty: 'empty',
    paymentShow: { url: (id) => `/payments/${id}` }, money: String, date: String,
});
function elements(element) {
    return React.isValidElement(element)
        ? [element, ...React.Children.toArray(element.props.children).flatMap(elements)]
        : [];
}
const tree = elements(PaymentTab({ order: {
    payment: { id: 1, provider_reference: 'ORD-QRIS', transaction_status: 'pending' },
    payment_logs: [],
} }));
assert.equal(tree.find((element) => element.props.label === 'Invoice DOKU')?.props.children, 'ORD-QRIS');
assert.ok(tree.some((element) => element.props.children === 'Sinkronkan DOKU'));
assert.ok(!tree.some((element) => element.props.label === 'Fraud Status'));
assert.doesNotMatch(source, /midtrans|fraud_status|settlement|capture/i);

for (const file of [
    'admin/payments/index.tsx', 'admin/payment-logs/index.tsx',
    'admin/orders/index.tsx', 'admin/sales/shared.tsx', 'admin/resource-index.tsx',
    'admin/settings/index.tsx', 'customer/policy/privacy-policy.tsx',
    'customer/order/detail-order.tsx',
]) {
    assert.doesNotMatch(readFileSync(new URL(`../resources/js/pages/${file}`, import.meta.url), 'utf8'), /midtrans|settlement|fraud_status|\bcapture\b/i, file);
}

console.log('DOKU admin payment surface checks passed.');

