import { z } from "zod";

const TaskStatusSchema = z.enum(["pending", "completed"]);

export const TaskSchema = z
  .object({
    _id: z.string(),
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(500).optional(),
    status: TaskStatusSchema,
    userId: z.string(),
    createdAt: z.date().or(z.string()).pipe(z.coerce.date()),
    updatedAt: z.date().or(z.string()).pipe(z.coerce.date()),
  });

export type TaskType = z.infer<typeof TaskSchema>;
