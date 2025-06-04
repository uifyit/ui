import { z } from "zod";

export function zodNumber() {
  return z
    .union([
      z.literal(""),
      z.string().regex(/^\d+$/, "Must be a non-negative integer as a string"),
    ])
    .optional()
    .transform((val) => val ?? null);
}
