"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Status } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All", },
  { label: "OPEN", value: "OPEN" },
  { label: "IN_PROGRESS", value: "IN_PROGRESS" },
  { label: "CLOSED", value: "CLOSED" },
]

export default function FilterStatus() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
    return (
    <Select onValueChange={status => {
        const query = status ? `status=${status}` : ""
        router.push(`?${query}`)
    }}>
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
