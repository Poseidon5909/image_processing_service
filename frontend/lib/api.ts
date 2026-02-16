// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Generic API request handler
export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body?: any,
  requireAuth: boolean = false
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (requireAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Something went wrong");
  }

  return response.json();
}

// Auth API functions
export async function register(email: string, password: string) {
  return apiRequest("/register", "POST", { email, password });
}

export async function login(email: string, password: string) {
  // Backend uses OAuth2PasswordRequestForm which expects 'username' field
  // but compares it to email in database
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed");
  }

  const data = await response.json();
  
  // Store JWT token in localStorage
  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
  }
  
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}

// Image API functions (authenticated)
export async function uploadImage(file: File, transformation?: string) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("Not authenticated");
  }

  const formData = new FormData();
  formData.append("file", file);
  if (transformation) {
    formData.append("transformation", transformation);
  }

  const response = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Upload failed");
  }

  return response.json();
}

export async function getUserImages() {
  return apiRequest("/images", "GET", undefined, true);
}

export async function getImageById(imageId: string) {
  return apiRequest(`/images/${imageId}`, "GET", undefined, true);
}

export async function deleteImage(imageId: string) {
  return apiRequest(`/images/${imageId}`, "DELETE", undefined, true);
}