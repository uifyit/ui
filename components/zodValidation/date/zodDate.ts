import { z, ZodString } from "zod";

export function zodDate(
  customRule: (schema: typeof z) => z.ZodOptional<ZodString> = (z) =>
    z.string().optional()
) {
  return customRule(z);
}
