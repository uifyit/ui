import { z } from "zod";
const SQL_INJECTION_REGEX =
  /('|;|--|\/\*|\*\/|EXEC|UNION\s+SELECT|xp_cmdshell|<img|<|>)/gi;

export function sanitizeSQLInput(value: string): string {
  return value.replace(SQL_INJECTION_REGEX, "").trim();
}

export function zodString() {
  return z
    .string()
    .transform(sanitizeSQLInput)
    .nullable()
    .optional()
    .transform((val) => val ?? null);
}
