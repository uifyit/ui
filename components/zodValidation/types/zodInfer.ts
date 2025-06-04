import { z } from "zod";

export type zodInfer<T extends z.ZodTypeAny> = z.infer<T>;
