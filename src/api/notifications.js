const BASE_URL = "/api";

export async function fetchNotifications(customerEmail) {
  const response = await fetch(`${BASE_URL}/notifications?customerEmail=${encodeURIComponent(customerEmail)}`);
  if (!response.ok) throw new Error("Failed to fetch notifications");
  const data = await response.json();
  return data;
}

export async function fetchUnreadCount(customerEmail) {
  const response = await fetch(`${BASE_URL}/notifications/unread/count?customerEmail=${encodeURIComponent(customerEmail)}`);
  if (!response.ok) throw new Error("Failed to fetch unread count");
  return response.json();
}

export async function markNotificationRead(id, read) {
  const response = await fetch(`${BASE_URL}/notifications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ read }),
  });
  if (!response.ok) throw new Error("Failed to update notification");
  const notification = await response.json();
  return notification;
}

export async function markAllNotificationsRead(customerEmail) {
  const response = await fetch(`${BASE_URL}/notifications/mark-all/read`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerEmail }),
  });
  if (!response.ok) throw new Error("Failed to mark all as read");
  return response.json();
}