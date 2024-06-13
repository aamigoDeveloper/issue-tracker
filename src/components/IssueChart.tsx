"use client"

import { ResponsiveContainer, BarChart, YAxis, XAxis, Bar } from "recharts"
import { Card } from "./ui/card"
interface IssueChartProps {
  open: number
  inProgress: number
  closed: number
}

export default function IssueChart({ open, inProgress, closed }: IssueChartProps) {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ]

  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
