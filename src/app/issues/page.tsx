import FilterStatus from "@/components/FilterStatus"
import PaginationIssue from "@/components/PaginationIssue"
import StatusBadge from "@/components/StatusBadge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import prisma from "@/lib/db"
import { Issue, Status } from "@prisma/client"
import { ArrowUp } from "lucide-react"
import Link from "next/link"

interface IssuesPageProps {
  searchParams: {
    status: Status
    orderBy: keyof Issue
    page: number
  }
}

const columns: { label: string; value: keyof Issue }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status" },
  { label: "CreatedAt", value: "createdAt" },
]

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined

    const currentPage = 1
    const issuePerPage = 5

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  })

  const totalIssues = await prisma.issue.count()

  return (
    <section className="max-w-6xl mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <FilterStatus />
        <Button asChild>
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>
          A List of Your {status ? `${status}` : ""} Issue&apos;s
        </TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.value}>
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && (
                  <ArrowUp size={15} className="inline" />
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`} className="hover:underline">
                  {issue.title}
                </Link>
              </TableCell>
              <TableCell>
                <StatusBadge status={issue.status} />
              </TableCell>
              <TableCell>{issue.createdAt.toISOString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationIssue currentPage={currentPage} totalIssues={totalIssues} pageSize={issuePerPage} />
    </section>
  )
}
