"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Status } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation"

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "OPEN", value: "OPEN" },
  { label: "IN_PROGRESS", value: "IN_PROGRESS" },
  { label: "CLOSED", value: "CLOSED" },
]

export default function FilterStatus() {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <Select
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams()
        if (status) params.append("status", status)
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!)
        const query = params.size ? `?${params.toString()}` : ""
        router.push(`/issues${query}`)
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter status..." />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.label} value={status.value!}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
