import IssueForm from "@/components/IssueForm"
import prisma from "@/lib/db"

interface EditIssuePageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: EditIssuePageProps) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })

  return {
    title: `Editing ${issue?.title}`,
    description: `Editing the issue ${issue?.id}`
  }
}

export default async function EditIssuePage({ params }: EditIssuePageProps) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  return (
    <div>
      <IssueForm issue={issue!} />
    </div>
  )
}
