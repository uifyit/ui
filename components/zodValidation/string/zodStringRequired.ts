import { z } from "zod";
import { sanitizeSQLInput } from "./zodString";

const defaultMessage = "This field is required";

export function zodStringRequired(message: string = defaultMessage) {
  return z.string().nonempty({ message: message }).transform(sanitizeSQLInput);
}
