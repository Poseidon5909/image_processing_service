// lib/api.ts
import config from "./config";

const BASE_URL = config.apiUrl;

// Token management utilities
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem("token");
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem("token", token);
}

export function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

// Generic API request handler with better error handling
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
    const token = getToken();
    if (!token) {
      throw new Error("You must be logged in to perform this action");
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Handle different error status codes
    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized - token might be invalid/expired
        removeToken();
        throw new Error("Session expired. Please log in again.");
      }
      
      if (response.status === 403) {
        throw new Error("You don't have permission to perform this action");
      }
      
      if (response.status === 404) {
        throw new Error("Resource not found");
      }
      
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }

      // Try to get error details from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Something went wrong");
    }

    return response.json();
  } catch (err: any) {
    // Re-throw our custom errors
    if (err.message) {
      throw err;
    }
    // Network errors
    throw new Error("Network error. Please check your connection.");
  }
}

// Auth API functions
export async function register(email: string, password: string) {
  return apiRequest("/register", "POST", { email, password });
}

export async function login(email: string, password: string) {
  // Backend uses OAuth2PasswordRequestForm which expects 'username' field
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid email or password");
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Login failed");
    }

    const data = await response.json();
    
    // Store JWT token using utility function
    if (data.access_token) {
      setToken(data.access_token);
    }
    
    return data;
  } catch (err: any) {
    if (err.message) {
      throw err;
    }
    throw new Error("Network error. Please check your connection.");
  }
}

export function logout() {
  removeToken();
}

// Image API functions (authenticated)
export async function uploadImage(file: File, transformation?: string) {
  const token = getToken();
  
  if (!token) {
    throw new Error("You must be logged in to upload images");
  }

  const formData = new FormData();
  formData.append("file", file);
  if (transformation) {
    formData.append("transformation", transformation);
  }

  try {
    const response = await fetch(`${BASE_URL}/images/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        throw new Error("Session expired. Please log in again.");
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Upload failed");
    }

    return response.json();
  } catch (err: any) {
    if (err.message) {
      throw err;
    }
    throw new Error("Network error. Please check your connection.");
  }
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

export async function transformImage(
  imageId: number,
  action: string,
  params: {
    width?: number;
    height?: number;
    angle?: number;
    output_format?: string;
    quality?: number;
  } = {}
) {
  const token = getToken();
  
  if (!token) {
    throw new Error("You must be logged in to transform images");
  }

  // Build query string - only include defined values
  const queryParams = new URLSearchParams();
  queryParams.append("image_id", imageId.toString());
  queryParams.append("action", action);
  
  // Add only defined parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(`${BASE_URL}/images/transform?${queryParams}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        throw new Error("Session expired. Please log in again.");
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Transformation failed");
    }

    return response.json();
  } catch (err: any) {
    if (err.message) {
      throw err;
    }
    throw new Error("Network error. Please check your connection.");
  }
}