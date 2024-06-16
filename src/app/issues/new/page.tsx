import IssueForm from "@/components/IssueForm"
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Add new Issue",
  description: "Adding a new Issue to the Issues List",
}

export default async function NewIssuePage() {
  const { isAuthenticated } = getKindeServerSession()

  return (
    <section>
      {(await isAuthenticated()) ? (
        <IssueForm />
      ) : (
        <div className="text-center space-y-3">
          <h3 className="text-xl font-semibold dark:text-slate-100">
            You&apos;re not Logged in to post a new Issue.
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
            Please{" "}
            <LoginLink className="text-slate-800 font-semibold hover:underline dark:text-slate-50">
              Login
            </LoginLink>{" "}
            first.
          </p>
        </div>
      )}
    </section>
  )
}
