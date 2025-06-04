import { z } from "zod";
const defaultMessage = "This field is required";
export function zodDateRequired(message: string = defaultMessage) {
  return z
    .string()
    .nonempty({ message: message })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Must be in ex: 0000-00-00 format",
    });
}
