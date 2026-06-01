import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Invalid email"),
  phone: z.string().min(6, "Invalid phone"),
  address: z.string().min(3, "Required"),
  city: z.string().min(1, "Required"),
  zip: z.string().min(3, "Invalid ZIP"),
  country: z.string().min(1, "Required"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;