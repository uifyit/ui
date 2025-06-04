import { z } from "zod";

export const zodPhone = () => {
  return z
    .string()
    .regex(
      /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "Phone must start with +8801 or 01 and be 11 digits (e.g. +8801XXXXXXXXX or 01XXXXXXXXX)"
    )
    .optional()
    .or(z.literal(""));
};
