import { Status } from "@prisma/client"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "./ui/card"

interface IssueSummeryProps {
  open: number
  inProgress: number
  closed: number
}

export default function IssueSummery({
  open,
  inProgress,
  closed,
}: IssueSummeryProps) {
  const containers: { label: string; status: Status; value: number }[] = [
    { label: "Open Issues", status: "OPEN", value: open },
    { label: "In Progress Issues", status: "IN_PROGRESS", value: inProgress },
    { label: "Closed Issues", status: "CLOSED", value: closed },
  ]

  return (
    <div className="flex space-x-5">
      {containers.map((container) => (
        <Card key={container.status} className="max-w-[200px] text-center">
          <CardHeader className="font-medium">
            <Link
              className="text-zinc-600 hover:text-zinc-800 hover:underline"
              href={`/issues?status=${container.status}`}
            >
              {container.label}
            </Link>
          </CardHeader>
          <CardContent className="font-bold text-center text-lg">
            {container.value}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
