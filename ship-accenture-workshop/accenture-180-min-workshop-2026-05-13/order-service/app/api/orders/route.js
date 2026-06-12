import { ORDERS } from '../../../lib/orders.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  const orders = status
    ? ORDERS.filter((o) => o.status === status)
    : ORDERS;

  return Response.json({ orders, count: orders.length });
}
