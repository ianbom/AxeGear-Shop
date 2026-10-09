import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const source = readFileSync(
    new URL('../resources/js/pages/contact/index.tsx', import.meta.url),
    'utf8',
);
const parsed = ts.createSourceFile(
    'contact.tsx',
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
const settings = {
    store_name: 'Database Store',
    store_email: 'store@example.com',
    store_phone: '+62 857-8064-5938',
    store_address: 'Alamat database',
    business_hours: 'Jam database',
    store_latitude: '-6.314540',
    store_longitude: '106.699569',
    contact_maps_url: 'https://maps.app.goo.gl/example',
    instagram_url: 'https://instagram.com/database-store',
    tiktok_url: null,
};

function render(contactSettings = settings) {
    const redirects = [];
    const errors = [];
    const passthrough = ({ children }) =>
        React.createElement('div', null, children);
    const context = {
        React,
        URL,
        encodeURIComponent,
        Head: () => null,
        ShopLayout: passthrough,
        useState: (initial) => [initial, (value) => errors.push(value)],
        FormData: class {
            constructor(values) {
                this.values = values;
            }
            get(key) {
                return this.values[key] ?? null;
            }
        },
        window: { location: { assign: (url) => redirects.push(url) } },
        ...Object.fromEntries(
            [
                'ArrowRight',
                'Clock3',
                'Instagram',
                'Mail',
                'MapPin',
                'MessageCircle',
                'Phone',
            ].map((name) => [name, () => null]),
        ),
    };
    const ContactIndex = runInNewContext(compiled + '\nContactIndex;', context);
    const tree = ContactIndex({ contactSettings });
    function elements(element) {
        if (!React.isValidElement(element)) {
            return [];
        }

        return [
            element,
            ...React.Children.toArray(element.props.children).flatMap(elements),
        ];
    }
    const nodes = elements(tree);
    const form = nodes.find((node) => node.type === 'form');
    function submit(full_name, message) {
        let prevented = false;
        form.props.onSubmit({
            preventDefault: () => {
                prevented = true;
            },
            currentTarget: { full_name, message },
        });
        assert.ok(prevented);
    }

    return {
        nodes,
        submit,
        redirects,
        errors,
        html: renderToStaticMarkup(tree),
    };
}

const page = render();
assert.deepEqual(
    page.nodes
        .filter((node) => node.type === 'input')
        .map((node) => node.props.name),
    ['full_name'],
);
assert.equal(
    page.nodes.find((node) => node.type === 'textarea').props.name,
    'message',
);
assert.equal(
    page.nodes.find((node) => node.type === 'textarea').props.maxLength,
    1000,
);

for (const value of [
    'Database Store',
    'store@example.com',
    'Alamat database',
    'Jam database',
]) {
    assert.ok(page.html.includes(value), value);
}

assert.ok(!page.html.includes('Your message has been sent.'));
assert.ok(!page.html.includes('href="#"'));
assert.ok(
    page.nodes
        .find((node) => node.type === 'iframe')
        .props.src.includes('-6.31454%2C106.699569'),
);
assert.ok(
    page.nodes.some(
        (node) =>
            node.type === 'a' && node.props.href === settings.instagram_url,
    ),
);

page.submit('  Rani & Budi  ', '  Produk A & B?\nUkuran #M + harga  ');
const draft = new URL(page.redirects[0]);
assert.equal(draft.origin, 'https://wa.me');
assert.equal(draft.pathname, '/6285780645938');
assert.equal(
    draft.searchParams.get('text'),
    'Halo Database Store, saya ingin menghubungi customer support.\n\nNama: Rani & Budi\n\nPesan:\nProduk A & B?\nUkuran #M + harga',
);

for (const [name, message] of [
    ['   ', 'Pesan'],
    ['Nama', '\n  '],
    ['Nama', 'A'.repeat(1001)],
]) {
    const invalid = render();
    invalid.submit(name, message);
    assert.equal(invalid.redirects.length, 0);
    assert.ok(invalid.errors.some(Boolean));
}

const limit = render();
limit.submit('Nama', 'A'.repeat(1000));
assert.equal(limit.redirects.length, 1);

for (const phone of [null, 'not-a-number', '628x12345', '123', '0']) {
    const unavailable = render({ ...settings, store_phone: phone });
    assert.equal(
        unavailable.nodes.find(
            (node) => node.type === 'button' && node.props.type === 'submit',
        ).props.disabled,
        true,
    );
    unavailable.submit('Nama', 'Pesan');
    assert.equal(unavailable.redirects.length, 0);
}

const localPhone = render({ ...settings, store_phone: '085780645938' });
localPhone.submit('Nama', 'Pesan');
assert.equal(new URL(localPhone.redirects[0]).pathname, '/6285780645938');

const fallbackMap = render({
    ...settings,
    store_latitude: 'invalid',
    store_longitude: null,
});
assert.ok(
    fallbackMap.nodes
        .find((node) => node.type === 'iframe')
        .props.src.includes(encodeURIComponent(settings.store_address)),
);
const empty = render(
    Object.fromEntries(Object.keys(settings).map((key) => [key, null])),
);
assert.ok(!empty.nodes.some((node) => node.type === 'iframe'));
assert.ok(!empty.html.includes('Surabaya'));
const unsafe = render({
    ...settings,
    instagram_url: 'javascript:alert(1)',
    contact_maps_url: 'javascript:alert(1)',
});
assert.ok(
    !unsafe.nodes.some(
        (node) =>
            node.type === 'a' && node.props.href?.startsWith('javascript:'),
    ),
);
console.log(
    'PASS: database contacts, form fields, WhatsApp encoding/validation, maps fallback, safe links',
);
