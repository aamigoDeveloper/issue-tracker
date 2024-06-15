"use server"

import prisma from "@/lib/db"

export const getUsersIssues = ({ userId }: { userId: string }) => {
  return prisma.issue.count({
    where: {
      userId,
    },
  })
}
