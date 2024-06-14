import IssueForm from "@/components/IssueForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add new Issue",
  description: "Adding a new Issue to the Issues List"
}

export default function NewIssuePage() {
  return (
    <section>
      <IssueForm />
    </section>
  )
}