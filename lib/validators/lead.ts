import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  serviceNeeded: z
    .string()
    .min(2, "Service needed must be at least 2 characters"),
  message: z.string().optional().nullable()
});

export type LeadFormInput = z.infer<typeof leadSchema>;
