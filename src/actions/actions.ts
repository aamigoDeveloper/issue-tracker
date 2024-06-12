"use server"

import prisma from "@/lib/db"
import { issueSchema } from "@/lib/validation"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

interface FormData {
    title: string,
    description: string
}

export const createIssue = async (formData: FormData) => {
  const validate = issueSchema.safeParse(formData)

  if (!validate.success) {
    return validate.error.format()
  }

  const { title, description } = validate.data

  await prisma.issue.create({
    data: {
      title,
      description,
    },
  })

  revalidatePath("/issues/new")
  redirect("/issues")
}
