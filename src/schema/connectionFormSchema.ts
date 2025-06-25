import { z } from "zod";

export const freshdeskSchema = z.object({
  freshdeskDomain: z
    .string()
    .min(1, 'Domain is required')
    .regex(/^[a-zA-Z0-9-]+\.freshdesk\.com$/, 'Please enter a valid Freshdesk domain (e.g., company.freshdesk.com)'),
  freshdeskApiKey: z.string().min(1, 'API key is required').min(10, 'API key seems too short')
});

export const hubspotSchema = z.object({
hubspotAccessToken: z
    .string()
    .min(1, 'Private App Token is required')
    .regex(/^pat-/, 'HubSpot Private App Token should start with "pat-"')
});