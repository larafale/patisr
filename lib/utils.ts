import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ObjectID from "bson-objectid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const serverError = (err: any) => {
  err = err.issues || err.errors || [{ message: err.message }];
  return { error: err };
};

export const oid = () => ObjectID().toHexString();

export const formatPrice = (value: any) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value)
  //.replace(/(\.|,)00/g, '');
