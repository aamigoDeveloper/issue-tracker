import { z } from "zod"

const statusSchema = z.enum(["OPEN", "IN_PROGRESS", "CLOSED"])

export const issueSchema = z.object({
  title: z.string().min(1, { message: "Title is Required." }),
  description: z.string().min(1, { message: "Description is Required." }),
  status: statusSchema,
})

export type IssueValidationSchema = z.infer<typeof issueSchema>
