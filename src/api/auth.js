const BASE_URL = "/api";

export async function signup({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/api/accounts/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Failed to create account" }));
    throw new Error(error.message || "Failed to create account");
  }

  return response.json();
}

export async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/api/accounts/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Invalid email or password" }));
    throw new Error(error.message || "Invalid email or password");
  }

  return response.json();
}

export async function updateAccount(id, updates) {
  const response = await fetch(`${BASE_URL}/api/accounts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update account");
  }

  return response.json();
}