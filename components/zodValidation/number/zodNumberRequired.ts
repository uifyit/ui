import { z } from "zod";

const defaultMessage = "This field is required";

export function zodNumberRequired(message: string = defaultMessage) {
  return z
    .string({ required_error: message }) // Handle required error
    .min(1, { message }) // Ensure not empty
    .regex(/^\d+$/, "Only non-negative whole numbers allowed");
}
