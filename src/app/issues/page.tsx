import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IssuesPage() {
  return (
    <section>
        <div className="flex items-center justify-between">
        issues
        <Button asChild>
            <Link href={"/issues/new"}>
            New Issue
            </Link>
        </Button>
        </div>
    </section>
  )
}