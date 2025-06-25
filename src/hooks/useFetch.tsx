"use client";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { FetchResponse } from "@/types";
import { useState, useCallback } from "react";

const useFetch = <T = unknown>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(
    async (
      url: string,
      method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD",
      body?: unknown,
      token?: string
    ): Promise<FetchResponse<T>> => {
      const headers = new Headers();

      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      headers.append("Content-Type", "application/json");

      const config: RequestInit = {
        method,
        headers,
        credentials: "include",
      };

      if (method !== "GET" && method !== "HEAD") {
        config.body = JSON.stringify(body);
      }

      const backendUrl = getBackendUrl();
      url = `${backendUrl}${url}`;

      try {
        setLoading(true);
        const response = await fetch(url, config);
        const json: FetchResponse<T> = await response.json();

        if (!json.success) {
          setError(json.message || "Request failed");
        } else {
          setError(null);
          setData(json.data ?? null);
        }

        return json;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, data, fetchData };
};

export default useFetch;
