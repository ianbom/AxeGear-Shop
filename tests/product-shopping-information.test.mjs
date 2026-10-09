import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import React from 'react';
import ts from 'typescript';

const source = readFileSync(
    new URL(
        '../resources/js/pages/customer/products/detail-product.tsx',
        import.meta.url,
    ),
    'utf8',
);
const parsed = ts.createSourceFile(
    'detail-product.tsx',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
);
const component = parsed.statements.find(
    (statement) =>
        ts.isFunctionDeclaration(statement) &&
        statement.name?.text === 'ProductShoppingInformation',
);
assert.ok(component);
const placements = [];
function findPlacements(node) {
    if (
        ts.isJsxSelfClosingElement(node) &&
        node.tagName.getText(parsed) === 'ProductShoppingInformation'
    ) {
        placements.push(node);
    }
    ts.forEachChild(node, findPlacements);
}
findPlacements(parsed);
assert.equal(placements.length, 2);
assert.match(
    placements[0].parent.openingElement.getText(parsed),
    /className="hidden lg:block"/,
);
assert.match(
    placements[1].parent.openingElement.getText(parsed),
    /className="lg:hidden"/,
);
assert.match(
    source.slice(placements[0].end, placements[1].pos),
    /<ProductSpecs\s/,
);
assert.ok(placements[1].end < source.indexOf('<OtherStyles'));
const compiled = ts.transpileModule(component.getText(parsed), {
    compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2022 },
}).outputText;
let openSection = null;
const ProductShoppingInformation = runInNewContext(
    compiled + '\nProductShoppingInformation;',
    {
        React,
        useState: () => [
            openSection,
            (next) => {
                openSection = next;
            },
        ],
        Collapsible: 'qa-collapsible',
        CollapsibleTrigger: 'qa-trigger',
        CollapsibleContent: 'qa-content',
        Link: 'a',
        contact: { url: () => '/contact' },
        ShieldCheck: 'qa-shield',
        PackageCheck: 'qa-package-check',
        Headphones: 'qa-headphones',
        Truck: 'qa-truck',
        Package: 'qa-package',
        MessageCircle: 'qa-message',
        ArrowUpRight: 'qa-arrow',
        Plus: 'qa-plus',
        Minus: 'qa-minus',
    },
);

function elements(element) {
    if (!React.isValidElement(element)) return [];
    return [
        element,
        ...React.Children.toArray(element.props.children).flatMap(elements),
    ];
}
function text(element) {
    if (typeof element === 'string') return element;
    if (!React.isValidElement(element)) return '';
    return React.Children.toArray(element.props.children).map(text).join(' ');
}
const render = () => elements(ProductShoppingInformation());
const roots = () =>
    render().filter((element) => element.type === 'qa-collapsible');
const initial = render();
assert.equal(roots().length, 3);
assert.ok(roots().every((element) => element.props.open === false));
const copy = text(ProductShoppingInformation());
for (const label of [
    'Secure Shopping',
    'Careful Packaging',
    'Customer Support',
    'Shipping Information',
    'Order Processing',
    'Product Care Guide',
    'Shipping & Delivery',
    'Returns & Exchanges',
    'Need Help?',
    'Chat With Us',
]) {
    assert.ok(copy.includes(label), label);
}
assert.ok(
    copy.indexOf('Secure Shopping') < copy.indexOf('Shipping Information'),
);
assert.ok(
    copy.indexOf('Order Processing') < copy.indexOf('Product Care Guide'),
);
assert.ok(copy.indexOf('Returns & Exchanges') < copy.indexOf('Need Help?'));
assert.equal(
    initial.find((element) => element.type === 'a').props.href,
    '/contact',
);
assert.doesNotMatch(
    copy,
    /Ships within 24 hours|Pick Up In Store|money.back|guaranteed refund/i,
);

roots()[0].props.onOpenChange(true);
assert.deepEqual(
    roots().map((element) => element.props.open),
    [true, false, false],
);
assert.equal(
    render().filter((element) => element.type === 'qa-minus').length,
    1,
);
roots()[1].props.onOpenChange(true);
assert.deepEqual(
    roots().map((element) => element.props.open),
    [false, true, false],
);
roots()[1].props.onOpenChange(false);
assert.ok(roots().every((element) => element.props.open === false));
assert.equal(
    render().filter((element) => element.type === 'qa-plus').length,
    3,
);
console.log('Product shopping information checks passed.');
