import assert from 'node:assert/strict';
import { getPaginationDirection } from '../resources/js/lib/pagination.ts';

for (const label of [
    'pagination.previous',
    'Previous',
    '&laquo; Previous',
    '&laquo;',
    '« Previous',
    '←',
    ' previous ',
]) {
    assert.equal(getPaginationDirection(label), 'previous', label);
}

for (const label of [
    'pagination.next',
    'Next',
    'Next &raquo;',
    '&raquo;',
    'Next »',
    '→',
    ' next ',
]) {
    assert.equal(getPaginationDirection(label), 'next', label);
}

for (const label of ['1', '12', '...', '…', '&hellip;', '', 'Nextdoor']) {
    assert.equal(getPaginationDirection(label), null, label);
}

console.log('Pagination label checks passed.');
