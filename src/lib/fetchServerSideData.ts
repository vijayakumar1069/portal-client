import { getToken } from "@/app/actions/auth.actions";
import { getBackendUrl } from "./getBackendUrl";
import { redirect } from "next/navigation";
import { FetchOptions } from "@/types";

export const dynamic = "force-dynamic";



// Define response structure from backend
interface BackendResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

// Generic function with inferred return type
export async function fetchServerSideData<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const token = await getTokenWithRetry(
    options.maxRetries || 10,
    options.retryDelay || 1000
  );

  if (!token) {
    redirect("/"); // Redirect if token is invalid or not available
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const config: RequestInit = {
    method: options.method || "GET",
    headers,
    cache: options.cache || "no-cache",
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  };

  try {
    const url = getBackendUrl();
    const response = await fetch(`${url}${endpoint}`, config);
    const res: BackendResponse<T> = await response.json();

    if (res.success) {
      return res.data as T;
    } else {
      throw new Error(res.message || "No data returned from API");
    }
  } catch (error) {
    console.error("Error fetching server-side data:", error);
    throw error;
  }
}

// Retry utility with basic JWT validation
async function getTokenWithRetry(
  maxRetries: number = 10,
  delay: number = 1000
): Promise<string | null> {
  let retries = 0;

  while (retries < maxRetries) {
    const token = await getToken();

    // Basic JWT format check
    if (token && token.split(".").length === 3) {
      return token;
    }

    retries++;
    if (retries < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return null;
}
