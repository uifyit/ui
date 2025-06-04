import { z } from "zod";

export function zodObject<T extends z.ZodRawShape>(shape: T) {
  return z.object(shape);
}
