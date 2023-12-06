import * as z from "zod";
import { oid } from "@/lib/utils";

const zoid = (message = "oid manquant") =>
  z.string().min(24).max(24, { message });

export const userSchema = z.object({
  id: zoid(),
  name: z.string().min(3).max(32),
  email: z.string(),
  role: z.string(),
});

export const productSchema = z.object({
  id: zoid().default(oid),
  categoryId: zoid("veuillez choisir une catégorie"),
  name: z.string().min(2, { message: "2 characters minimum" }),
  price: z.coerce
    .number()
    .multipleOf(0.01)
    .min(2, { message: "minimum de 2€" }),
});

export const categorySchema = z.object({
  id: zoid().default(oid),
  name: z.string().min(2, { message: "2 characters minimum" }),
});

export const cartItemSchema = productSchema.extend({
  qty: z.coerce.number().multipleOf(1).min(1).max(20).default(1)
})

export type User = z.infer<typeof userSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
