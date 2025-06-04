import { z } from "zod";
import { allowedDomains, allowedDomainsMessage } from "./zodEmail";

const defaultMessage = "This field is required";

export function zodEmailRequired(message: string = defaultMessage) {
  return z
    .string({ required_error: message })
    .email(defaultMessage)
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return allowedDomains.includes(domain as string);
      },
      {
        message: allowedDomainsMessage,
      }
    );
}
