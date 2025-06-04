import { z } from "zod";

export function zodArray<T extends {}>(schema: T) {
  return z.array(schema);
}
