import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import React from 'react';
import ts from 'typescript';

const source = readFileSync(
    new URL('../resources/js/pages/admin/products/form.tsx', import.meta.url),
    'utf8',
);
const parsed = ts.createSourceFile(
    'form.tsx',
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
const imports = parsed.statements
    .filter(ts.isImportDeclaration)
    .flatMap((statement) =>
        statement.importClause?.namedBindings &&
        ts.isNamedImports(statement.importClause.namedBindings)
            ? statement.importClause.namedBindings.elements.map(
                  (item) => item.name.text,
              )
            : [],
    );

function elements(node) {
    if (!React.isValidElement(node)) {
        return [];
    }

    return [
        node,
        ...React.Children.toArray(node.props.children).flatMap(elements),
    ];
}

function harness(mode = 'create') {
    const hooks = [];
    let cursor = 0;
    let form;
    let posted;
    const effects = [];
    const revoked = [];
    const document = {
        activeElement: { focus() {} },
        querySelectorAll: () => [],
    };
    const context = {
        ...Object.fromEntries(imports.map((name) => [name, () => null])),
        ProductShippingEstimate: () => null,
        React,
        document,
        URL: {
            revokeObjectURL: (value) => revoked.push(value),
            createObjectURL: () => 'blob:new-image',
        },
        useId: () => 'error-id',
        useState(initial) {
            const index = cursor++;

            if (!(index in hooks)) {
                hooks[index] =
                    typeof initial === 'function' ? initial() : initial;
            }

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
        useRef(initial) {
            const index = cursor++;

            return (hooks[index] ??= { current: initial });
        },
        useMemo: (callback) => callback(),
        useEffect: (callback) => effects.push(callback),
        requestAnimationFrame: (callback) => {
            callback();

            return 1;
        },
        cancelAnimationFrame() {},
        useForm(initial) {
            form ??= {
                data: initial,
                errors: {},
                processing: false,
                transform() {},
                post: (url, options) => {
                    posted = { url, options };
                },
                setData: (key, value) => {
                    form.data[key] = value;
                },
            };

            return form;
        },
        store: { url: () => '/admin/products' },
        update: { url: (id) => '/admin/products/' + id },
    };
    const api = runInNewContext(
        compiled +
            '\n({ ProductForm, FieldGroup, blankVariant, productErrorLabel, variantIndexesWithErrors, focusProductField });',
        context,
    );
    const props = {
        mode,
        product: mode === 'edit' ? { id: 7 } : null,
        options: {
            categories: [],
            collections: [],
            statuses: ['draft', 'published', 'archived'],
        },
    };
    function render() {
        cursor = 0;
        effects.length = 0;

        return api.ProductForm(props);
    }
    render();
    function fail(errors) {
        const tree = render();
        elements(tree)
            .find((node) => node.type === 'form')
            .props.onSubmit({ preventDefault() {} });
        assert.equal(
            posted.url,
            mode === 'edit' ? '/admin/products/7' : '/admin/products',
        );
        assert.equal(posted.options.forceFormData, true);
        form.errors = errors;
        posted.options.onError(errors);

        return render();
    }

    return { api, context, render, fail, form, revoked, effects };
}

for (const mode of ['create', 'edit']) {
    const shipping = harness(mode);
    for (const field of ['weight', 'length', 'width', 'height']) {
        const group = elements(shipping.render()).find(
            (node) =>
                node.type === shipping.api.FieldGroup &&
                node.props.field === field,
        );
        assert.equal(group.props.required, true);
        assert.equal(
            elements(group).find((node) => node.type === shipping.context.Input)
                .props.required,
            true,
        );
    }
}

const pricing = harness();
elements(pricing.render())
    .find(
        (node) =>
            node.type === pricing.context.Button &&
            React.Children.toArray(node.props.children).includes('Add Variant'),
    )
    .props.onClick();
function draftField(field) {
    return elements(pricing.render()).find(
        (node) =>
            node.type === pricing.api.FieldGroup &&
            node.props.field === 'variants.new.' + field,
    );
}
function changeDraft(field, value) {
    elements(draftField(field))
        .find((node) => node.type === pricing.context.Input)
        .props.onChange({ target: { value } });
}
function saveDraft() {
    const dialog = elements(pricing.render()).find(
        (node) => node.type === pricing.context.Dialog,
    );
    elements(dialog)
        .find(
            (node) =>
                node.type === pricing.context.Button &&
                React.Children.toArray(node.props.children).includes(
                    'Add Variant',
                ),
        )
        .props.onClick();
}
changeDraft('regular_price', '100000');
changeDraft('sale_price', '100001');
assert.equal(
    draftField('sale_price').props.error,
    'Harga diskon tidak boleh melebihi harga normal.',
);
saveDraft();
assert.equal(pricing.form.data.variants.length, 0);
changeDraft('regular_price', '100002');
assert.equal(draftField('sale_price').props.error, undefined);
changeDraft('regular_price', '100000');
assert.equal(
    draftField('sale_price').props.error,
    'Harga diskon tidak boleh melebihi harga normal.',
);
changeDraft('sale_price', '100000');
saveDraft();
assert.equal(pricing.form.data.variants.length, 0);
for (const field of ['weight', 'length', 'width', 'height']) {
    assert.equal(draftField(field).props.required, true);
    assert.ok(draftField(field).props.error);
    changeDraft(field, '0');
}
saveDraft();
assert.equal(pricing.form.data.variants.length, 1);
assert.equal(pricing.form.data.variants[0].sale_price, '100000');

for (const mode of ['create', 'edit']) {
    const test = harness(mode);
    const uploadedFile = { name: 'variant.jpg' };
    test.form.data.variants = [
        { ...test.api.blankVariant(), sku: 'FIRST', stock: 5 },
        {
            ...test.api.blankVariant(),
            sku: 'SECOND',
            stock: -2,
            image: uploadedFile,
        },
    ];
    const tree = test.fail({
        name: 'Nama produk wajib diisi.',
        'variants.1.stock': 'Stok varian 2 minimal 0.',
    });
    const dialog = elements(tree).find(
        (node) => node.type === test.context.Dialog,
    );
    assert.equal(dialog.props.open, true);
    const stock = elements(dialog).find(
        (node) =>
            node.type === test.api.FieldGroup && node.props.label === 'Stock',
    );
    assert.equal(stock.props.error, 'Stok varian 2 minimal 0.');
    assert.equal(stock.props.field, 'variants.1.stock');
    assert.equal(
        elements(stock).find((node) => node.type === test.context.Input).props
            .value,
        -2,
    );
    assert.equal(test.form.data.variants[1].image, uploadedFile);
    const save = elements(dialog).find(
        (node) =>
            node.type === test.context.Button &&
            node.props.children === 'Save Changes',
    );
    save.props.onClick();
    assert.equal(test.form.data.variants[1].image, uploadedFile);
    assert.deepEqual(test.revoked, []);
}

const multiple = harness();
multiple.form.data.variants = [
    { ...multiple.api.blankVariant(), sku: 'FIRST', stock: 5 },
    { ...multiple.api.blankVariant(), sku: 'SECOND', stock: 6 },
];
let tree = multiple.fail({
    'variants.1.stock': 'Second error',
    'variants.0.stock': 'First error',
    'images.0.alt_text': 'Keterangan terlalu panjang.',
});
let dialog = elements(tree).find(
    (node) => node.type === multiple.context.Dialog,
);
let stock = elements(dialog).find(
    (node) =>
        node.type === multiple.api.FieldGroup && node.props.label === 'Stock',
);
assert.equal(stock.props.field, 'variants.0.stock');
elements(stock)
    .find((node) => node.type === multiple.context.Input)
    .props.onChange({ target: { value: '8' } });
tree = multiple.render();
dialog = elements(tree).find((node) => node.type === multiple.context.Dialog);
const next = elements(dialog).find(
    (node) =>
        node.type === 'button' &&
        React.Children.toArray(node.props.children).join('') === 'Varian 2',
);
next.props.onClick();
assert.equal(multiple.form.data.variants[0].stock, '8');
dialog = elements(multiple.render()).find(
    (node) => node.type === multiple.context.Dialog,
);
stock = elements(dialog).find(
    (node) =>
        node.type === multiple.api.FieldGroup && node.props.label === 'Stock',
);
assert.equal(stock.props.field, 'variants.1.stock');
assert.equal(stock.props.error, 'Second error');
assert.ok(
    elements(tree).some(
        (node) =>
            node.type === 'p' && node.props.id === 'image-0-alt_text-error',
    ),
);

const empty = harness();
dialog = elements(
    empty.fail({ variants: 'Tambahkan varian aktif dengan stok.' }),
).find((node) => node.type === empty.context.Dialog);
assert.equal(dialog.props.open, true);
assert.ok(
    elements(dialog).some(
        (node) =>
            node.type === 'p' &&
            node.props.children === 'Tambahkan varian aktif dengan stok.',
    ),
);
const ordinary = harness();
const repeated = harness();
repeated.form.data.variants = [
    { ...repeated.api.blankVariant(), sku: 'FIRST' },
    { ...repeated.api.blankVariant(), sku: 'SECOND' },
];
repeated.fail({ 'variants.1.stock': 'Stok salah.' });
dialog = elements(
    repeated.fail({ variants: 'Aktifkan varian dengan stok.' }),
).find((node) => node.type === repeated.context.Dialog);
assert.equal(
    elements(dialog).find(
        (node) =>
            node.type === repeated.api.FieldGroup &&
            node.props.label === 'Stock',
    ).props.field,
    'variants.0.stock',
);
dialog = elements(ordinary.fail({ name: 'Nama produk wajib diisi.' })).find(
    (node) => node.type === ordinary.context.Dialog,
);
assert.equal(dialog.props.open, false);
assert.deepEqual(
    Array.from(
        ordinary.api.variantIndexesWithErrors({
            'variants.10.stock': 'A',
            'variants.2.sku': 'B',
            'variants.2.image': 'C',
            variants: 'D',
        }),
    ),
    [2, 10],
);
assert.equal(
    ordinary.api.productErrorLabel('variants.1.stock', [{}, { sku: 'SKU-B' }]),
    'Varian 2 (SKU-B) — Stok',
);

let focused;
let scrolled;
const control = {
    focus() {
        focused = control;
        ordinary.context.document.activeElement = control;
    },
};
const target = {
    dataset: { errorField: 'variants.1.stock' },
    querySelector: () => control,
    scrollIntoView: (options) => {
        scrolled = options;
    },
};
ordinary.api.focusProductField('variants.1.stock', {
    querySelectorAll: () => [target],
});
assert.equal(focused, control);
assert.equal(scrolled.block, 'center');
target.dataset.errorField = 'variants.1.image';
ordinary.api.focusProductField('variants.1.image_url', {
    querySelectorAll: () => [target],
});
assert.equal(focused, control);
const attributes = new Map([['aria-describedby', 'existing-help']]);
const input = {
    id: '',
    getAttribute: (name) => attributes.get(name),
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
};
const label = { htmlFor: '' };
ordinary.context.useRef = () => ({
    current: {
        querySelector: (selector) => (selector === 'label' ? label : input),
    },
});
ordinary.context.useEffect = (callback) => callback();
ordinary.api.FieldGroup({
    label: 'Stock',
    field: 'variants.1.stock',
    error: 'Stok salah.',
    children: null,
});
assert.equal(attributes.get('aria-invalid'), 'true');
assert.equal(attributes.get('aria-describedby'), 'existing-help error-id');
assert.equal(label.htmlFor, input.id);
ordinary.api.FieldGroup({
    label: 'Stock',
    field: 'variants.1.stock',
    children: null,
});
assert.equal(attributes.get('aria-invalid'), 'false');
assert.equal(attributes.get('aria-describedby'), 'existing-help');
console.log(
    'PASS: create/edit error modal, field targeting, sorted variants, draft/file preservation, navigation, image errors',
);
