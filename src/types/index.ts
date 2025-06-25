import { authSchema } from "@/schema/authSchema";
import { freshdeskSchema, hubspotSchema } from "@/schema/connectionFormSchema";
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
export type FreshdeskFormData = z.infer<typeof freshdeskSchema>;
export type HubSpotFormData = z.infer<typeof hubspotSchema>;

export interface Requester {
  id: number;
  name: string;
  email: string;
  mobile?: string;
  phone?: string;
}

export interface Ticket {
  id: number;
  subject: string;
  status: number;
  priority: number;
  type: string;
  created_at: string;
  updated_at: string;
  due_by: string;
  fr_due_by: string;
  requester: Requester;
  tags: string[];
  sentiment_score: number;
  company_id?: number;
  group_id?: number;
  responder_id?: number;
  custom_fields?: Record<string, unknown>;
}

export interface Conversation {
  id: number;
  body: string;
  created_at: string;
  user_id: number;
  to_emails?: string[];
  from_email?: string;
  support_email?: string;
}
export interface TicketDetails extends Ticket {
  description_text?: string;
  conversations?: Conversation[];
}

// Define options type for clarity
export interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
  maxRetries?: number;
  retryDelay?: number;
}

export interface HubSpotContact {
  id: string;
  properties: {
    email: string;
    firstname?: string;
    lastname?: string;
    lifecyclestage?: string;
    phone?: string;
    company?: string;
    createdate: string;
    lastmodifieddate: string;
  };
}