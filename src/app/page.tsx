import IssueSummery from "@/components/IssueSummery";
import IssueChart from "@/components/IssueChart";
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
    <section className="max-w-[1300px] mx-auto grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <IssueSummery open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </div>
        <LatestIssues />
    </section>
  );
}
