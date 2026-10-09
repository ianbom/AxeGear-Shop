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
        statement.name?.text === 'ProductGallery',
);
assert.ok(component);
const compiled = ts.transpileModule(component.getText(parsed), {
    compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2022 },
}).outputText;
const ProductGallery = runInNewContext(compiled + '\nProductGallery;', {
    React,
    useRef: () => ({ current: null }),
    useEffect: (effect) => effect(),
    ChevronUp: () => null,
    ChevronDown: () => null,
    Search: () => null,
});

function elements(element) {
    if (!React.isValidElement(element)) return [];
    return [
        element,
        ...React.Children.toArray(element.props.children).flatMap(elements),
    ];
}

for (const count of [0, 1, 6, 9]) {
    const gallery = Array.from({ length: count }, (_value, index) => ({
        url: '/photo-' + index + '.jpg',
        alt: 'Photo ' + index,
    }));
    for (let activeIndex = 0; activeIndex < Math.max(1, count); activeIndex++) {
        const selected = [];
        const nodes = elements(
            ProductGallery({
                gallery,
                mainImage: gallery[activeIndex]?.url ?? null,
                productTitle: 'Product',
                onSelectImage: (url) => selected.push(url),
            }),
        );
        const thumbnails = nodes.filter(
            (node) =>
                node.type === 'button' &&
                Object.hasOwn(node.props, 'aria-pressed'),
        );
        assert.equal(thumbnails.length, count);
        assert.equal(
            thumbnails.filter((node) => node.props['aria-pressed']).length,
            count ? 1 : 0,
        );
        const previous = nodes.find(
            (node) => node.props['aria-label'] === 'Previous product image',
        );
        const next = nodes.find(
            (node) => node.props['aria-label'] === 'Next product image',
        );
        if (count === 0) {
            assert.equal(previous, undefined);
            assert.equal(next, undefined);
            continue;
        }
        assert.equal(previous.props.disabled, activeIndex === 0);
        assert.equal(next.props.disabled, activeIndex === count - 1);
        if (!previous.props.disabled) {
            previous.props.onClick();
            assert.equal(selected.pop(), gallery[activeIndex - 1].url);
        }
        if (!next.props.disabled) {
            next.props.onClick();
            assert.equal(selected.pop(), gallery[activeIndex + 1].url);
        }
        thumbnails[count - 1].props.onClick();
        assert.equal(selected.pop(), gallery[count - 1].url);
    }
}
console.log('Product gallery checks passed.');
