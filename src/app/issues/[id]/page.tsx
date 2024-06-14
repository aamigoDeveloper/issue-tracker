import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"
import DeleteIssue from "./DeleteIssue"
import StatusBadge from "@/components/StatusBadge"
import { cache } from "react"

interface IssueDetailPageProps {
  params: { id: string }
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
)

export async function generateMetadata({ params }: IssueDetailPageProps) {
  const issue = await fetchUser(parseInt(params.id))

  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`,
  }
}

export default async function IssueDetailPage({
  params,
}: IssueDetailPageProps) {
  const issue = await fetchUser(parseInt(params.id))

  return (
    <section className="max-w-6xl mx-auto flex sm:flex-row flex-col space-y-5 items-center justify-between gap-4">
      <div className="max-w-2xl space-y-5">
        <h2 className="text-lg font-medium">{issue?.title}</h2>
        <div className="flex items-center gap-2">
          <StatusBadge status={issue?.status!} />
          <span>{issue?.createdAt.toISOString()}</span>
        </div>
        <p className="text-zinc-700">{issue?.description}</p>
      </div>
      <div className="flex flex-col space-y-4 w-full sm:max-w-[200px]">
        <Button
          asChild
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500"
          size={"lg"}
        >
          <Link href={`/issues/edit/${issue?.id}`}>
            <Pencil size={16} />
            Edit
          </Link>
        </Button>
        <DeleteIssue issueId={issue!.id} />
      </div>
    </section>
  )
}
