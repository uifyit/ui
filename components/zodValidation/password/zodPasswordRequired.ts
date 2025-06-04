import { z } from "zod";

export function zodPasswordRequired(
  passwordRule: (schema: typeof z) => z.ZodTypeAny = (z) =>
    z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      )
) {
  return passwordRule(z);
}
