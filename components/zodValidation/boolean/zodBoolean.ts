import { z } from "zod";

const defaultMessage = "This field is required";

export function zodBoolean() {
  return z.coerce.boolean();
}
