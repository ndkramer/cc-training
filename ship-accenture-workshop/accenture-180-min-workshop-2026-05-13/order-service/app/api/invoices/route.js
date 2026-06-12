import { reconcile } from '../../../lib/reconciliation.js';
import { ORDERS } from '../../../lib/orders.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return Response.json(
      { error: 'orderId query parameter is required' },
      { status: 400 }
    );
  }

  const order = ORDERS.find((o) => o.id === orderId);
  if (!order) {
    return Response.json(
      { error: `order '${orderId}' not found` },
      { status: 404 }
    );
  }

  try {
    const result = reconcile(orderId);
    return Response.json({ order, reconciliation: result });
  } catch (err) {
    return Response.json(
      { error: `no invoice data for ${orderId}: ${err.message}` },
      { status: 404 }
    );
  }
}
