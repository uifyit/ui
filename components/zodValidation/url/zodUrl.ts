import { z } from "zod";

export const zodUrl = () => {
  return z
    .string()
    .url("Invalid URL format (e.g. https://example.com)")
    .optional()
    .or(z.literal(""));
};
