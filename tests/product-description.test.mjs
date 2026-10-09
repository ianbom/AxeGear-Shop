import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
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
        statement.name?.text === 'ProductSpecs',
);
assert.ok(component);
const compiled = ts.transpileModule(component.getText(parsed), {
    compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2022 },
}).outputText;
const ProductSpecs = runInNewContext(compiled + '\nProductSpecs;', {
    React,
    FadeInOnScroll: ({ children }) => children,
    HTMLRender: ({ html }) =>
        React.createElement('div', {
            dangerouslySetInnerHTML: { __html: html },
        }),
});
const render = (description, productLine = null, styleName = null) =>
    renderToStaticMarkup(
        React.createElement(ProductSpecs, {
            productDescription: description,
            product: {
                product_line: productLine,
                style_name: styleName,
                weight: 500,
                dimensions: { length: 20, width: 10, height: 5 },
            },
        }),
    );

for (const empty of [null, '', '   ']) {
    assert.equal(render(empty, empty, empty), '');
}
const complete = render(
    '<p>Product details</p><ul><li>Feature</li></ul>',
    'Performance',
    'Sport',
);
assert.match(complete, /Product details/);
assert.match(complete, /Product Line/);
assert.match(complete, /Style Name/);
assert.doesNotMatch(complete, /Weight|Width|Length|Height|gram| cm/);
assert.doesNotMatch(
    render('<p>Description only</p>'),
    /<dl|Product Line|Style Name/,
);
assert.match(render(null, 'Performance'), /Performance/);
assert.doesNotMatch(render(null, 'Performance'), /Style Name|—/);
assert.match(render(null, null, 'Sport'), /Sport/);
assert.doesNotMatch(render(null, null, 'Sport'), /Product Line|—/);
console.log('Product description checks passed.');
