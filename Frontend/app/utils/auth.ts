import { redirect } from "react-router";

const apiUrl = import.meta.env.VITE_API_URL;

// Decode JWT payload safely
function decodeJwt(token: string) {
  try {
    const base64 = token.split(".")[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

function clearStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("lastActive");
}

function updateActivity() {
  localStorage.setItem("lastActive", Date.now().toString());
}

function isInactive() {
  const lastActive = Number(localStorage.getItem("lastActive"));
  const week = 7*24*60*60*1000;
  return Date.now() - lastActive > week;
}

async function refreshTokenIfNeeded(token: string) {
  const payload = decodeJwt(token);
  if (!payload?.exp) return null;

  const now = Date.now() / 1000;
  const timeLeft = payload.exp - now;

  if (timeLeft <= 0) return null;

  if (timeLeft < 300) {
    try {
      const res = await fetch(`${apiUrl}/api/auth/refresh`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return null;

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      updateActivity();

      return data.token;
    } catch {
      return null;
    }
  }

  return token;
}

export async function requireUser() {
  const token = localStorage.getItem("token");

  // no token
  if (!token) return redirect("/login");

  // inactive too long
  if (isInactive()) {
    clearStorage();
    return redirect("/login?expired=1");
  }

  // update activity
  updateActivity();

  // try auto-refresh
  const newToken = await refreshTokenIfNeeded(token);

  if (!newToken) {
    clearStorage();
    return redirect("/login");
  }

  const payload = decodeJwt(newToken);
  const now = Date.now() / 1000;

  if (!payload?.exp || payload.exp < now) {
    clearStorage();
    return redirect("/login");
  }

  // cached user
  const cached = localStorage.getItem("user");
  if (cached) return JSON.parse(cached);

  // fetch user
  try {
    const res = await fetch(`${apiUrl}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${newToken}` },
    });

    if (!res.ok) throw new Error();
    const data = await res.json();

    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  } catch {
    clearStorage();
    return redirect("/login");
  }
}

export async function optionalUser() {
  const token = localStorage.getItem("token");

  if (!token || isInactive()) {
    clearStorage();
    return { user: null };
  }

  updateActivity();

  const newToken = await refreshTokenIfNeeded(token);
  if (!newToken) {
    clearStorage();
    return { user: null };
  }

  const cached = localStorage.getItem("user");
  if (cached) return { user: JSON.parse(cached) };

  try {
    const res = await fetch(`${apiUrl}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${newToken}` },
    });

    if (!res.ok) throw new Error();

    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    return { user: data.user };
  } catch {
    clearStorage();
    return { user: null };
  }
}