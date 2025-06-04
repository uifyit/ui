import { z } from "zod";

export function zodPassword(
  passwordRule: (schema: typeof z) => z.ZodTypeAny = (z) =>
    z.string().nullable()
) {
  return passwordRule(z);
}
