import { z } from "zod";

const defaultMessage = "This field is required";

export function zodBooleanRequired(message: string = defaultMessage) {
  return z.coerce.boolean().refine((val) => val === true, {
    message: message,
  });
}
