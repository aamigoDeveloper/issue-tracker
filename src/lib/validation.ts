import { z } from "zod"

export const issueSchema = z.object({
  title: z.string().min(1, { message: "Title is Required." }),
  description: z.string().min(1, { message: "Description is Required." }),
})

export type IssueValidationSchema = z.infer<typeof issueSchema>
