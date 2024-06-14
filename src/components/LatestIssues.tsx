import prisma from "@/lib/db"
import { Table, TableBody, TableCaption, TableCell, TableRow } from "./ui/table"
import { Card } from "./ui/card"
import Link from "next/link"
import StatusBadge from "./StatusBadge"

export default async function LatestIssues() {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  })

  return (
    <Card className="p-3">
      <h1 className="text-xl font-semibold mb-2">Latest Issues</h1>
      <Table>
        <TableCaption>A List of Latest Issues</TableCaption>
        <TableBody>
          {latestIssues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Link
                  href={`/issues/${issue.id}`}
                  className="text-zinc-600 hover:text-zinc-800 hover:underline"
                >
                  {issue.title}
                </Link>
              </TableCell>
              <TableCell className="hidden sm:block">
                <StatusBadge status={issue.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
