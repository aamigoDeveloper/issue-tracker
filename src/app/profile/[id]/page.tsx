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
        <Button asChild>
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
      </div>
      <IssueList issues={issues} searchParams={searchParams} />
    </section>
  )
}
