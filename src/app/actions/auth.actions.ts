"use server";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { AuthFormData, AuthResponse, FetchResponse } from "@/types";
import { cookies } from "next/headers";

const url = getBackendUrl();

export async function signInAction(loginData: AuthFormData): Promise<AuthResponse> {
  try {
    const endpoint = `${url}/api/auth/signin`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    });

    const json: FetchResponse = await res.json();
    

    if (json.success && json.token) {
   
       const cookieStore =await cookies(); // no need to await here

      cookieStore.set("access_token", json.token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_DEV === "production",
        sameSite:
          process.env.NEXT_PUBLIC_NODE_DEV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 1 * 24 * 60 * 60, 
      });
   }
    

    return json;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login error." };
  }
}

export async function signUpAction(signupData: AuthFormData): Promise<AuthResponse> {
  try {
    const endpoint = `${url}/api/auth/signup`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
      credentials: "include",
    });

    const json: FetchResponse = await res.json();
    

    if (json.success && json.token) {
 
       const cookieStore =await cookies(); // no need to await here

      cookieStore.set("access_token", json.token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_DEV === "production",
        sameSite:
          process.env.NEXT_PUBLIC_NODE_DEV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 1 * 24 * 60 * 60, 
      });
   }

    return json;
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: "Signup error." };
  }
}

export async function signOutAction(): Promise<AuthResponse> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("access_token");
    
    // If token exists, add it to blacklist via backend API
    if (tokenCookie?.value) {
      await fetch(`${url}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${tokenCookie.value}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    }

    // Clear the cookie
    cookieStore.set("access_token", "", {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_NODE_DEV === "production",
      sameSite: process.env.NEXT_PUBLIC_NODE_DEV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 0,
    });

    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    console.error("Signout error:", error);
    return { success: false, message: "Signout error." };
  }
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("access_token");
  return tokenCookie ? tokenCookie.value : null;
}