import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import React from 'react';
import ts from 'typescript';

const source = readFileSync(
    new URL(
        '../resources/js/pages/customer/order/detail-order.tsx',
        import.meta.url,
    ),
    'utf8',
);
const parsed = ts.createSourceFile(
    'detail-order.tsx',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
);
const imports = parsed.statements.filter(ts.isImportDeclaration);
const context = {
    React,
    URL,
    Intl,
    Date,
    exports: {},
    useState: (initial) => [initial, () => {}],
    ProfileLayout: 'qa-layout',
    orderIndex: { url: () => '/orders' },
    orderCancel: { url: () => '/orders/cancel' },
    productShow: { url: () => '/detail' },
    router: { post() {} },
};
for (const declaration of imports) {
    if (declaration.moduleSpecifier.text === 'lucide-react') {
        for (const icon of declaration.importClause.namedBindings.elements) {
            context[icon.name.text] = `qa-${icon.name.text}`;
        }
    }
}
const code = parsed.statements
    .filter((statement) => !ts.isImportDeclaration(statement))
    .map((statement) => statement.getText(parsed))
    .join('\n');
const compiled = ts.transpileModule(code, {
    compilerOptions: {
        jsx: ts.JsxEmit.React,
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
    },
}).outputText;
const { DetailOrder, getBiteshipTrackingUrl, ActionButton } = runInNewContext(
    compiled + '\n({ DetailOrder, getBiteshipTrackingUrl, ActionButton });',
    context,
);
function elements(element) {
    if (!React.isValidElement(element)) return [];
    return [
        element,
        ...React.Children.toArray(element.props.children).flatMap(elements),
    ];
}
const shipment = (link) => ({ raw_order_response: { courier: { link } } });
assert.equal(
    getBiteshipTrackingUrl(shipment(' https://example.com/track ')),
    'https://example.com/track',
);
assert.equal(
    getBiteshipTrackingUrl(shipment('http://example.com/track')),
    'http://example.com/track',
);
for (const value of [
    null,
    '',
    ' ',
    'javascript:alert(1)',
    'data:text/html,test',
    '/relative',
    'not a URL',
]) {
    assert.equal(getBiteshipTrackingUrl(shipment(value)), null);
}
assert.equal(getBiteshipTrackingUrl(null), null);
for (const status of [
    'pending_payment',
    'shipped',
    'delivered',
    'completed',
    'cancelled',
]) {
    for (const link of [
        null,
        'javascript:alert(1)',
        'https://example.com/track',
    ]) {
        const order = {
            id: 1,
            order_status: status,
            payment_status: 'paid',
            payment: null,
            payment_logs: [],
            shipment: shipment(link),
            items: [],
            trackings: [],
        };
        const tree = elements(DetailOrder({ order }));
        const action = tree.find(
            (element) => element.props.label === 'Lacak Pesanan',
        );
        const rendered = ActionButton(action.props);
        if (link?.startsWith('https:')) {
            assert.ok(!rendered.props.disabled);
            assert.equal(rendered.type, 'a');
            assert.equal(rendered.props.href, link);
            assert.equal(rendered.props.target, '_blank');
        } else {
            assert.equal(rendered.type, 'button');
            assert.equal(rendered.props.disabled, true);
            assert.equal(rendered.props.onClick, undefined);
        }
        const region = tree.find(
            (element) => element.props['aria-label'] === 'Riwayat Pengiriman',
        );
        assert.equal(region, undefined);
    }
}
const populated = elements(
    DetailOrder({
        order: {
            id: 1,
            order_status: 'shipped',
            payment_status: 'paid',
            payment: null,
            payment_logs: [],
            shipment: null,
            items: [],
            trackings: [
                {
                    id: 1,
                    status: 'in_transit',
                    description: 'Dalam perjalanan',
                    location: 'Makassar',
                    happened_at: null,
                },
            ],
        },
    }),
);
assert.ok(
    !populated.some((element) => element.props.children === 'Dalam perjalanan'),
);
assert.ok(!populated.some((element) => element.props.children === 'Makassar'));
for (const [supportPhone, expected] of [
    ['0857 8064-5938', 'https://wa.me/6285780645938'],
    ['+62 (857) 8064-5938', 'https://wa.me/6285780645938'],
    ['6285780645938', 'https://wa.me/6285780645938'],
    [null, null],
    ['', null],
    ['invalid', null],
    ['123', null],
    ['6285780645938<script>', null],
]) {
    const tree = elements(
        DetailOrder({
            supportPhone,
            order: {
                id: 1,
                order_status: 'shipped',
                payment_status: 'paid',
                payment: null,
                payment_logs: [],
                shipment: null,
                items: [],
                trackings: [],
            },
        }),
    );
    const action = tree.find((element) => element.props.label === 'Dukungan');
    const rendered = ActionButton(action.props);
    if (expected) {
        assert.equal(rendered.type, 'a');
        assert.equal(rendered.props.href, expected);
        assert.equal(rendered.props.target, '_blank');
        assert.equal(rendered.props.rel, 'noreferrer');
    } else {
        assert.equal(rendered.type, 'button');
        assert.equal(rendered.props.disabled, true);
        assert.ok(
            tree.some(
                (element) =>
                    element.props.children ===
                    'Nomor WhatsApp toko belum tersedia.',
            ),
        );
    }
}
assert.doesNotMatch(
    source,
    /Riwayat Pengiriman|showTrackingHistory|trackingHistoryRef/,
);
console.log('Order courier tracking and WhatsApp support checks passed.');
