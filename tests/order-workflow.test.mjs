import assert from 'node:assert/strict';
import { getOrderWorkflow } from '../resources/js/lib/order-workflow.ts';

const order = (changes = {}) => ({
    order_status: 'pending_payment',
    payment_status: 'pending',
    shipping_status: 'not_created',
    ...changes,
});

for (const [status, currentStep] of [
    ['pending_payment', 0],
    ['paid', 1],
    ['processing', 2],
    ['ready_to_ship', 3],
    ['shipment_created', 3],
    ['shipped', 4],
    ['delivered', 5],
    ['completed', 6],
]) {
    assert.deepEqual(getOrderWorkflow(order({ order_status: status })), {
        currentStep,
        completed: status === 'completed',
        issue: null,
    });
}

assert.equal(
    getOrderWorkflow(order({ payment_status: 'paid' })).currentStep,
    1,
);

for (const [status, currentStep] of [
    ['confirmed', 3],
    ['allocated', 3],
    ['picked', 4],
    ['in_transit', 4],
    ['delivered', 5],
]) {
    const result = getOrderWorkflow(order({ shipping_status: status }));
    assert.equal(result.currentStep, currentStep);
    assert.equal(result.completed, false);
}

assert.equal(
    getOrderWorkflow(
        order({
            shipping_status: 'delivered',
            shipment: { shipping_status: 'picked' },
        }),
    ).currentStep,
    4,
);
assert.equal(
    getOrderWorkflow(
        order({ order_status: 'completed', shipping_status: 'delivered' }),
    ).completed,
    true,
);

for (const status of [
    'cancelled',
    'payment_failed',
    'payment_expired',
    'shipment_failed',
    'shipment_problem',
    'lost',
    'returned',
    'refunded',
]) {
    const result = getOrderWorkflow(order({ order_status: status }));
    assert.ok(result.issue, status);
    assert.equal(result.currentStep, 0, status);
    assert.equal(result.completed, false, status);
}

for (const status of [
    'failed',
    'expired',
    'cancelled',
    'manual_review',
    'refunded',
    'partially_refunded',
]) {
    assert.ok(
        getOrderWorkflow(order({ payment_status: status })).issue,
        status,
    );
}

for (const status of ['failed', 'problem', 'lost', 'returned', 'cancelled']) {
    assert.ok(
        getOrderWorkflow(order({ shipping_status: status })).issue,
        status,
    );
}

assert.equal(
    getOrderWorkflow(
        order({
            order_status: 'shipment_failed',
            paid_at: '2026-10-09',
            status_history: [{ status: 'ready_to_ship' }],
        }),
    ).currentStep,
    3,
);
assert.equal(
    getOrderWorkflow(
        order({
            order_status: 'shipment_problem',
            trackings: [{ status: 'in_transit' }],
        }),
    ).currentStep,
    4,
);
assert.equal(
    getOrderWorkflow(
        order({
            order_status: 'returned',
            shipment: { delivered_at: '2026-10-09' },
        }),
    ).currentStep,
    5,
);
assert.equal(
    getOrderWorkflow(
        order({ order_status: 'lost', shipment: { shipped_at: '2026-10-09' } }),
    ).currentStep,
    4,
);
assert.equal(
    getOrderWorkflow(
        order({
            order_status: 'refunded',
            status_history: [{ status: 'completed' }],
        }),
    ).currentStep,
    5,
);
assert.equal(
    getOrderWorkflow(
        order({
            order_status: 'refunded',
            status_history: [{ status: 'completed' }],
        }),
    ).completed,
    false,
);
assert.equal(
    getOrderWorkflow(order({ order_status: 'unknown' })).currentStep,
    0,
);
console.log('Order workflow checks passed');
