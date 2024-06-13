import FilterStatus from "@/components/FilterStatus"
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
import { Status } from "@prisma/client"
import Link from "next/link"

interface IssuesPageProps {
  searchParams: {
    status: Status
  }
}

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const issues = await prisma.issue.findMany({
    where: { status },
  })

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
            <TableHead>Issues</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CreatedAt</TableHead>
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
    </section>
  )
}
