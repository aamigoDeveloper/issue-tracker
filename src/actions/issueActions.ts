"use server"

import prisma from "@/lib/db"
import { issueSchema } from "@/lib/validation"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

interface FormData {
  title: string
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

export const deleteIssue = async (id: number) => {
  const issue = await prisma.issue.findUnique({
    where: { id },
  })

  if (!issue) {
    throw new Error("No Issue found.")
  }

  await prisma.issue.delete({
    where: { id: issue?.id },
  })

  revalidatePath(`/issues/${issue?.id}`)
  redirect("/issues")
}

export const updateIssue = async (id: number, formData: FormData) => {
  const issue = await prisma.issue.findUnique({
    where: { id },
  })

  if (!issue) {
    throw new Error("No Issue found.")
  }

  const validate = issueSchema.safeParse(formData)

  if (!validate.success) {
    return validate.error.format()
  }

  const { title, description } = validate.data

  await prisma.issue.update({
    where: { id },
    data: {
      title,
      description,
    },
  })

  revalidatePath(`/issues/edit/${issue.id}`)
  redirect("/issues")
}