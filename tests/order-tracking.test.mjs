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
    productIndex: { url: () => '/list' },
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
    if (!React.isValidElement(element)) {
return [];
}

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

for (const [method, expected] of [
    ['bank_transfer', 'Bank Transfer'],
    ['qris', 'QRIS'],
    ['va_bca', 'VA BCA'],
    ['va_bsi', 'VA BSI'],
    ['credit_card', 'credit card'],
    [null, 'Metode pembayaran belum tersedia'],
    [' ', 'Metode pembayaran belum tersedia'],
]) {
    const tree = elements(
        DetailOrder({
            order: {
                id: 1,
                order_status: 'shipped',
                payment_status: 'paid',
                payment: {
                    payment_provider: 'doku',
                    payment_method: method,
                    payment_method_label: method === 'va_bca' ? 'VA BCA' : method === 'va_bsi' ? 'VA BSI' : undefined,
                },
                payment_logs: [],
                shipment: null,
                items: [],
                trackings: [],
            },
        }),
    );
    assert.equal(
        tree.find((element) => element.props.label === 'Metode Pembayaran')
            .props.children,
        expected,
    );
    assert.equal(
        tree.find((element) => element.props.label === 'Metode').props.value,
        expected,
    );
}

for (const [shipmentDetails, expectedWaybill] of [
    [null, 'Pengiriman belum dibuat'],
    [{ shipping_status: 'not_created' }, 'Pengiriman belum dibuat'],
    [{ shipping_status: 'confirmed', biteship_order_id: 'booking-1' }, 'No. resi belum tersedia'],
    [{ shipping_status: 'confirmed', waybill_id: 'RESI-123' }, 'RESI-123'],
]) {
    const tree = elements(DetailOrder({ order: {
        id: 1, order_status: 'pending_payment', payment_status: 'pending',
        shipping_status: 'not_created', payment: null, payment_logs: [],
        shipment: shipmentDetails, items: [], trackings: [], address: null,
    } }));
    const statuses = tree.filter((element) => element.type.name === 'StatusPill');
    assert.equal(statuses.length, 2);
    assert.equal(statuses[0].props.children, 'Menunggu pembayaran');
    assert.equal(tree.find((element) => element.props.label === 'No. Resi Pengiriman').props.children, expectedWaybill);
    assert.equal(tree.find((element) => element.props.label === 'No. Resi').props.value, expectedWaybill);
    assert.equal(tree.find((element) => element.props.label === 'Tanggal Pembayaran').props.value, 'Belum dibayar');
    assert.equal(tree.find((element) => element.props.label === 'Catatan Pengiriman').props.value, 'Tidak ada catatan pengiriman');
}

const paidOrder = elements(DetailOrder({ order: {
    id: 1, order_status: 'shipped', payment_status: 'paid',
    paid_at: '2026-11-10T10:30:00Z', payment: null, payment_logs: [],
    shipment: { shipping_status: 'in_transit', waybill_id: 'RESI-123' },
    items: [], trackings: [], address: { note: 'Titip di pos satpam' },
} }));
assert.equal(paidOrder.filter((element) => element.type.name === 'StatusPill')[0].props.children, 'Sedang dikirim');
assert.notEqual(paidOrder.find((element) => element.props.label === 'Tanggal Pembayaran').props.value, 'Belum dibayar');
assert.equal(paidOrder.find((element) => element.props.label === 'Catatan Pengiriman').props.value, 'Titip di pos satpam');

for (const checkoutUrl of ['https://sandbox.doku.com/pay', null]) {
    const tree = elements(DetailOrder({ order: {
        id: 1, order_status: 'pending_payment', payment_status: 'pending',
        payment: { payment_provider: 'doku', payment_method: 'qris', checkout_url: checkoutUrl },
        payment_logs: [], shipment: null, items: [], trackings: [],
    } }));
    const pay = tree.find((element) => element.props.label === 'Lanjut Bayar');
    assert.ok(pay, 'DOKU payment continuation must be visible');
    const rendered = ActionButton(pay.props);

    if (checkoutUrl) {
        assert.equal(rendered.type, 'a');
        assert.equal(rendered.props.href, checkoutUrl);
        assert.equal(rendered.props.target, undefined, 'Payment must stay in the same tab');
    } else {
        assert.equal(rendered.props.disabled, true);
    }

    assert.ok(!tree.some((element) => element.props.label === 'Batalkan Pesanan'));
    assert.ok(tree.some((element) => typeof element.props.children === 'string' && element.props.children.includes('Pembatalan pembayaran DOKU dinonaktifkan sementara')));
}

assert.doesNotMatch(source, /midtrans|Bukti Pembayaran/i);
console.log('Order tracking, support and QRIS continuation checks passed.');
