import FilterStatus from "@/components/FilterStatus"
import IssueList, { IssueQuery, columnNames } from "@/components/IssueList"
import PaginationIssue from "@/components/PaginationIssue"
import { Button } from "@/components/ui/button"

import prisma from "@/lib/db"
import { Status } from "@prisma/client"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
}

interface IssuesPageProps {
  searchParams: IssueQuery
}

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const where = { status }

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 7

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <section className="max-w-6xl mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <FilterStatus />
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-500 dark:text-white"
        >
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
      </div>
      <IssueList issues={issues} searchParams={searchParams} />
      <PaginationIssue
        currentPage={page}
        totalIssues={issueCount}
        pageSize={pageSize}
      />
    </section>
  )
}
