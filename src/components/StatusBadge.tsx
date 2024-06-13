import { Status } from "@prisma/client"
import { Badge } from "./ui/badge"

interface StatusBadgeProps {
  status: Status
}

type StatusVariant = "default" | "outline" | "destructive"

const statuses: Record<
  Status,
  { label: string; status: Status; variant: StatusVariant }
> = {
  OPEN: { label: "OPEN", status: "OPEN", variant: "default" },
  IN_PROGRESS: {
    label: "IN_PROGRESS",
    status: "IN_PROGRESS",
    variant: "outline",
  },
  CLOSED: { label: "CLOSED", status: "CLOSED", variant: "destructive" },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant={statuses[status].variant}>{statuses[status].label}</Badge>
  )
}
