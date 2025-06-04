import { z } from "zod";
export const allowedDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "simec.com.bd",
];
export const allowedDomainsMessage =
  "Email will be gmail, outlook, yahoo, hotmail, or simec.com.bd";
export const zodEmail = () => {
  return z
    .union([
      z.literal(""),
      z
        .string()
        .email("Must be a valid email address")
        .refine(
          (email) => {
            const domain = email.split("@")[1];
            return allowedDomains.includes(domain as string);
          },
          {
            message: allowedDomainsMessage,
          }
        ),
    ])
    .optional()
    .transform((val) => (val === "" ? null : val));
};
