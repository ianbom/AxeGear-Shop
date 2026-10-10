import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(
    new URL(
        '../resources/js/pages/customer/products/list-product.tsx',
        import.meta.url,
    ),
    'utf8',
);
const parsed = ts.createSourceFile(
    'list-product.tsx',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
);
const elements = [];
function collect(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        elements.push(node);
    }
    ts.forEachChild(node, collect);
}
collect(parsed);
function attribute(element, name) {
    return element.attributes.properties
        .find(
            (property) =>
                ts.isJsxAttribute(property) &&
                property.name.getText(parsed) === name,
        )
        ?.initializer?.getText(parsed);
}
const filter = elements.find(
    (element) => attribute(element, 'onClick') === '{openFilter}',
);
assert.equal(attribute(filter, 'aria-expanded'), '{isFilterOpen}');
assert.match(attribute(filter, 'className'), /h-12/);
assert.match(attribute(filter, 'className'), /md:h-11/);
const toolbar = filter.parent.parent.openingElement;
assert.match(attribute(toolbar, 'className'), /grid grid-cols-2 gap-3/);
assert.match(attribute(toolbar, 'className'), /md:flex/);
const search = elements.find(
    (element) => attribute(element, 'placeholder') === '"Search products"',
);
const searchForm = search.parent.openingElement;
assert.match(
    attribute(searchForm, 'className'),
    /order-first col-span-2 w-full/,
);
assert.match(attribute(searchForm, 'className'), /md:order-none/);
const sort = elements.find(
    (element) => attribute(element, 'aria-label') === '"Sort products"',
);
assert.match(attribute(sort, 'className'), /absolute inset-0 h-full w-full/);
assert.match(attribute(sort, 'className'), /opacity-0/);
assert.match(attribute(sort, 'className'), /md:static/);
assert.match(attribute(sort, 'className'), /md:opacity-100/);
assert.match(
    attribute(sort, 'onChange'),
    /visit\(\{[\s\S]*\.\.\.form,[\s\S]*sort: selected.value,[\s\S]*order: selected.order/,
);
for (const icon of ['SlidersHorizontal', 'ArrowDownUp']) {
    const element = elements.find(
        (element) => element.tagName.getText(parsed) === icon,
    );
    assert.equal(attribute(element, 'aria-hidden'), '"true"');
}
const grids = elements.filter((element) =>
    /grid-cols-2.*md:grid-cols-3/.test(attribute(element, 'className') ?? ''),
);
assert.equal(grids.length, 2);
assert.ok(
    grids.every((element) =>
        /lg:grid-cols-4/.test(attribute(element, 'className')),
    ),
);
assert.match(source, /aspect-square overflow-hidden bg-white p-2 md:p-6/);
assert.match(source, /gap-2 text-\[16px\].*md:gap-4 md:text-\[18px\]/);
const productTile = source.slice(source.indexOf('const ProductTile ='));
assert.doesNotMatch(productTile, /product\.(sku|category)\b/);
assert.doesNotMatch(productTile, /Performance Gear|AxeGear Edition/);
assert.match(productTile, /product\.collection &&/);
assert.match(productTile, /visibleColors\.length > 0 &&/);
console.log('Product list mobile layout and card content checks passed.');
