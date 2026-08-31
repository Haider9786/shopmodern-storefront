const BASE_URL = "/api";

export async function createOrder(orderData) {
  const response = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  const newOrder = await response.json();
  return newOrder;
}

export async function fetchOrders() {
  const response = await fetch(`${BASE_URL}/api/orders`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  const data = await response.json();
  return data;
}

export async function createReview(reviewData) {
  const response = await fetch(`${BASE_URL}/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) throw new Error("Failed to submit review");
  const review = await response.json();
  return review;
}

export async function fetchReviewsByCustomer(customerEmail) {
  const response = await fetch(`${BASE_URL}/api/reviews`);
  if (!response.ok) throw new Error("Failed to fetch reviews");
  const data = await response.json();
  return data
    .map(r => ({ ...r, id: r.id }))
    .filter(r => r.customerEmail?.toLowerCase() === customerEmail?.toLowerCase());
}

export async function fetchProductsSafe() {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.map(p => ({ ...p, id: p.id }));
  } catch {
    return [];
  }
}