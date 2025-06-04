import { z } from "zod";

const defaultMessage = "This field is required";

export function zodPhoneRequired(message: string = defaultMessage) {
  return z
    .string()
    .nonempty(message)
    .regex(
      /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "Phone must start with +8801 or 01 and be 11 digits (e.g. +8801XXXXXXXXX or 01XXXXXXXXX)"
    );
}
