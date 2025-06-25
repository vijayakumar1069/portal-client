"use client";

import { useState, useEffect } from "react";

interface TokenResponse {
  token: string | null;
}

const useAccessToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response: Response = await fetch("/api/get-token", {  // ✅ Correct endpoint
          method: "GET",
          credentials: "include",
        });
        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const data: TokenResponse = await response.json();

        setToken(data.token);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error fetching token:", err);
        } else {
          setError("An unknown error occurred");
          console.error("Error fetching token:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { token, loading, error };
};

export default useAccessToken;
