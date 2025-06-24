import { authSchema } from "@/schema/authSchema";
import { z } from "zod";

export type AuthFormData = z.infer<typeof authSchema>;

export interface FetchResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
}
// 2️⃣ Type for backend response
export interface AuthResponse {
  success: boolean;
  data?: unknown;  // You can strongly type 'data' if you know its structure
  message?: string;
  
 
}
