import IssueSummery from "@/components/IssueSummery";
import IssuesBar from "@/components/IssuesBar";
import LatestIssues from "@/components/LatestIssues";
import prisma from "@/lib/db";

export default async function Home() {
  const open = await prisma.issue.count({ 
    where: { status: "OPEN" }
  })

  const inProgress = await prisma.issue.count({ 
    where: { status: "IN_PROGRESS" }
  })
  const closed = await prisma.issue.count({ 
    where: { status: "CLOSED" }
  })
  
  return (
    <section className="max-w-[1300px] mx-auto grid grid-cols-2 gap-8">
        <IssueSummery open={open} inProgress={inProgress} closed={closed} />
        <LatestIssues />
        <IssuesBar />
    </section>
  );
}
