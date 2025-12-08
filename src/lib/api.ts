import { store } from "../redux/store";
import { setCredentials, logout } from "../features/auth/authSlice";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const api = async (endpoint: string, options: FetchOptions = {}) => {
  let url = endpoint;
  if (!endpoint.startsWith("http")) {
    url = `${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  }

  const state = store.getState();
  const token = state.auth.token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {
      try {
        // Try to refresh the token
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          const { access_token, refresh_token: newRefreshToken } =
            data.data.session;

          // Update store
          store.dispatch(
            setCredentials({
              token: access_token,
              refreshToken: newRefreshToken,
            })
          );

          // Retry original request with new token
          headers["Authorization"] = `Bearer ${access_token}`;
          response = await fetch(url, {
            ...options,
            headers,
          });
        } else {
          // Refresh failed, logout
          store.dispatch(logout());
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        store.dispatch(logout());
      }
    } else {
      // No refresh token, logout
      store.dispatch(logout());
    }
  }

  return response;
};
