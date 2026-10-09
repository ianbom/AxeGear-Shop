import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import React from 'react';
import ts from 'typescript';
import { getOrderWorkflow } from '../resources/js/lib/order-workflow.ts';

function loadPage(path, names) {
    const source = readFileSync(new URL(path, import.meta.url), 'utf8');
    const parsed = ts.createSourceFile(
        path,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
    );
    const context = { React, Intl, Date, URL, getOrderWorkflow };
    for (const statement of parsed.statements.filter(ts.isImportDeclaration)) {
        const clause = statement.importClause;
        if (clause?.isTypeOnly) continue;
        if (clause?.name) context[clause.name.text] = () => null;
        if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
            for (const element of clause.namedBindings.elements) {
                context[element.name.text] = Object.assign(() => null, {
                    url: () => '/qa-route',
                });
            }
        }
    }
    const hooks = [];
    let cursor = 0;
    const posts = [];
    Object.assign(context, {
        getOrderWorkflow,
        useMemo: (callback) => callback(),
        useRef: () => ({ current: null }),
        useState(initial) {
            const index = cursor++;
            if (!(index in hooks)) hooks[index] = initial;
            return [
                hooks[index],
                (value) => {
                    hooks[index] =
                        typeof value === 'function'
                            ? value(hooks[index])
                            : value;
                },
            ];
        },
        router: { post: (...args) => posts.push(args) },
        updateStatus: { url: (id) => '/admin/orders/' + id + '/status' },
    });
    const declarations = parsed.statements
        .filter((statement) => !ts.isImportDeclaration(statement))
        .map((statement) =>
            statement
                .getText(parsed)
                .replace('export default function', 'function'),
        )
        .join('\n');
    const compiled = ts.transpileModule(declarations, {
        compilerOptions: {
            jsx: ts.JsxEmit.React,
            target: ts.ScriptTarget.ES2022,
        },
    }).outputText;
    runInNewContext(
        compiled + '\nthis.api = { ' + names.join(', ') + ' };',
        context,
    );
    return {
        ...context.api,
        posts,
        reset: () => {
            cursor = 0;
        },
    };
}

function elements(node) {
    if (Array.isArray(node)) return node.flatMap(elements);
    return React.isValidElement(node)
        ? [node, ...elements(node.props.children)]
        : [];
}

function text(node) {
    if (Array.isArray(node)) return node.map(text).join(' ');
    if (React.isValidElement(node)) return text(node.props.children);
    return typeof node === 'string' ? node : '';
}

const issue = {
    status: 'lost',
    label: 'Paket dilaporkan hilang',
    description:
        'Kurir melaporkan paket hilang. Verifikasi laporan kehilangan di dashboard Biteship.',
    reason: 'Keterangan operasional lengkap dari kurir.',
    is_terminal: true,
};
const order = {
    id: 1,
    order_number: 'ORD-ISSUE',
    order_status: 'lost',
    payment_status: 'paid',
    shipping_status: 'lost',
    shipping_issue: issue,
    allowedStatuses: ['shipment_failed'],
    items: [],
    trackings: [{ id: 1, status: 'in_transit', description: null }],
    status_history: [],
    payment_logs: [],
    payment: null,
    address: null,
    paid_at: '2026-10-10T03:00:00Z',
    grand_total: 110000,
    shipment: {
        id: 1,
        shipping_status: 'lost',
        shipped_at: '2026-10-10T04:00:00Z',
        delivered_at: null,
        raw_order_response: {},
    },
};
const customer = loadPage(
    '../resources/js/pages/customer/order/detail-order.tsx',
    ['DetailOrder', 'buildProgress', 'labelStatus', 'statusTone'],
);
const progress = customer.buildProgress(order);
assert.equal(progress[1].complete, true);
assert.equal(progress[4].complete, true);
assert.equal(progress[5].complete, false);
assert.equal(customer.statusTone('lost'), 'red');
assert.equal(customer.statusTone('on_hold'), 'amber');
assert.equal(customer.labelStatus('unknown'), 'Status perlu diperiksa');
const customerOrder = {
    ...order,
    shipping_issue: {
        ...issue,
        description: 'Kurir melaporkan paket Anda hilang.',
    },
};
const customerTree = customer.DetailOrder({ order: customerOrder });
assert.match(text(customerTree), /Paket dilaporkan hilang/);
assert.match(text(customerTree), /Hubungi toko/);
assert.ok(
    elements(customerTree).some(
        (node) => node.props['aria-label'] === 'Kendala pengiriman',
    ),
);
const customerIssue = elements(customerTree).find(
    (node) => node.props['aria-label'] === 'Kendala pengiriman',
);
assert.match(text(customerIssue), /Kurir melaporkan paket Anda hilang\./);
assert.doesNotMatch(
    text(customerIssue),
    /Status dari kurir|Keterangan operasional|dashboard Biteship|\blost\b/,
);
assert.equal((text(customerIssue).match(/Hubungi toko/g) ?? []).length, 1);
customer.reset();
const failedCustomerTree = customer.DetailOrder({
    order: { ...customerOrder, order_status: 'shipment_failed' },
});
const failedCustomerIssue = elements(failedCustomerTree).find(
    (node) => node.props['aria-label'] === 'Kendala pengiriman',
);
assert.doesNotMatch(
    text(failedCustomerIssue),
    /Admin telah|status pembayaran|secara otomatis/,
);
const admin = loadPage('../resources/js/pages/admin/orders/show.tsx', [
    'OrderShow',
    'PageHeader',
]);
function render() {
    admin.reset();
    return admin.OrderShow({ order });
}
let tree = render();
const adminIssue = elements(tree).find(
    (node) => node.props['aria-label'] === 'Kendala pengiriman',
);
assert.match(text(adminIssue), /dashboard Biteship/);
assert.match(text(adminIssue), /Status dari kurir:.*lost/);
assert.match(text(adminIssue), /Keterangan operasional lengkap dari kurir/);
assert.match(text(adminIssue), /Pembaruan terakhir/);
const header = elements(tree).find((node) => node.type === admin.PageHeader);
header.props.onStatusChange('shipment_failed');
assert.equal(admin.posts.length, 0);
tree = render();
assert.match(text(tree), /Tandai pesanan gagal dikirim/);
assert.match(text(tree), /tidak melakukan refund/);
let confirm = elements(tree).find(
    (node) => text(node) === 'Ya, tandai gagal dikirim',
);
confirm.props.onClick();
assert.equal(admin.posts.length, 0);
tree = render();
assert.match(text(tree), /Tuliskan alasan/);
elements(tree)
    .find((node) => node.props.id === 'shipping-failure-reason')
    .props.onChange({
        target: { value: '  Kurir mengonfirmasi kehilangan.  ' },
    });
tree = render();
confirm = elements(tree).find(
    (node) => text(node) === 'Ya, tandai gagal dikirim',
);
confirm.props.onClick();
assert.equal(admin.posts.length, 1);
assert.equal(admin.posts[0][0], '/admin/orders/1/status');
assert.deepEqual(JSON.parse(JSON.stringify(admin.posts[0][1])), {
    status: 'shipment_failed',
    reason: 'Kurir mengonfirmasi kehilangan.',
});
assert.equal(admin.posts[0][2].preserveScroll, true);
const paused = {
    ...order,
    order_status: 'shipment_problem',
    shipping_status: 'problem',
    shipping_issue: { ...issue, status: 'on_hold', is_terminal: false },
    allowedStatuses: [],
};
admin.reset();
const pausedTree = admin.OrderShow({ order: paused });
const pausedHeader = elements(pausedTree).find(
    (node) => node.type === admin.PageHeader,
);
assert.doesNotMatch(
    text(admin.PageHeader(pausedHeader.props)),
    /Tandai Gagal Dikirim/,
);
assert.equal(
    getOrderWorkflow({
        ...order,
        order_status: 'delivered',
        shipment: { ...order.shipment, delivered_at: '2026-10-10' },
    }).currentStep,
    4,
);
console.log('Order shipping issue, progress and confirmation checks passed.');
