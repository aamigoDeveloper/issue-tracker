import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"

export default async function IssueDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  return (
    <section className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="space-y-5">
        <h2 className="text-lg font-medium">{issue?.title}</h2>
        <p className="text-zinc-700">{issue?.description}</p>
      </div>
      <div className="space-y-4">
        <Button asChild className="w-32 flex items-center gap-2">
          <Link href={`/issues/edit/${issue?.id}`}>
            <Pencil size={16} />
            Edit
          </Link>
        </Button>
        <Button
          variant={"destructive"}
          className="w-32 flex items-center gap-2"
        >
          <Trash size={16} />
          Delete
        </Button>
      </div>
    </section>
  )
}
