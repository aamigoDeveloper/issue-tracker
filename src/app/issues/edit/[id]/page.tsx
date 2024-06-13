import IssueForm from "@/components/IssueForm"
import prisma from "@/lib/db"

export default async function EditIssuePage({ params }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id)}
    })
  return (
    <div>
      <IssueForm issue={issue!} />
    </div>
  )
}
