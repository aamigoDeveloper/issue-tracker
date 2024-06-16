import IssueList, { IssueQuery } from "@/components/IssueList"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"
import Link from "next/link"

interface ProfilePageProps {
  params: {
    id: string
  }
  searchParams: IssueQuery
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  })

  return {
    title: `${user?.given_name} Profile`,
    description: `${user?.given_name} Issues`,
  }
}

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps) {
  const issues = await prisma.issue.findMany({
    where: {
      userId: params.id,
    },
  })

  return (
    <section className="max-w-6xl mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Issues</h2>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-500 dark:text-white"
        >
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
      </div>
      <IssueList issues={issues} searchParams={searchParams} />
    </section>
  )
}
