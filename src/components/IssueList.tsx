import StatusBadge from "@/components/StatusBadge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Issue, Status } from "@prisma/client"
import { ArrowUp } from "lucide-react"
import Link from "next/link"

export interface IssueQuery {
  status: Status
  orderBy: keyof Issue
  page: string
}

interface IssueListProps {
  searchParams: IssueQuery
  issues: Issue[]
}

export default function IssueList({
  issues,
  searchParams: { orderBy, status, page },
}: IssueListProps) {
  return (
    <Table>
      <TableCaption>
        List of {status ? `${status}` : ""} Issue&apos;s
      </TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.value}
              className={
                column.label === "CreatedAt"
                  ? "hidden sm:flex items-center"
                  : undefined
              }
            >
              <Link
                href={{
                  query: { status, page, orderBy: column.value },
                }}
              >
                {column.label}
              </Link>
              {column.value === orderBy && (
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
            <TableCell className="hidden sm:block">
              {issue.createdAt.toISOString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const columns: { label: string; value: keyof Issue }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status" },
  { label: "CreatedAt", value: "createdAt" },
]

export const columnNames = columns.map((column) => column.value)
