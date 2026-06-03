import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().trim().min(1, "Required"),
  lastName: z.string().trim().min(1, "Required"),
  email: z.string().trim().min(1, "Required").email("Invalid email"),
  phone: z.string().trim().min(6, "Invalid phone"),
  address: z.string().trim().min(3, "Required"),
  city: z.string().trim().min(1, "Required"),
  zip: z.string().trim().min(3, "Invalid ZIP"),
  country: z.string().trim().min(1, "Required"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;