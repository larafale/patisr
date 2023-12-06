"use client";
import { toast } from "sonner";

export const clientError = (err?: any, toastFn?: any) => {
  if (!err) return false;
  err = err.map((e: any) => {
    const field = e?.path?.[0] || "";
    const message = field ? `${field} - ${e.message}` : e.message;
    (toastFn ?? toast.error)(message);
  });
  return err;
};
