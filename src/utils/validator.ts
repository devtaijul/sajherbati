import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (value) => {
        const normalized = value.startsWith("+88")
          ? value.replace("+88", "")
          : value;

        return /^01[3-9]\d{8}$/.test(normalized);
      },
      {
        message: "Enter a valid Bangladeshi mobile number",
      },
    ),
  address: z.string().min(1, "Address is required"),
  deliveryArea: z.string().min(1, "Please select a delivery area"),
  note: z.string().nullable(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
