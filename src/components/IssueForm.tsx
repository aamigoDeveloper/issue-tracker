"use client"

import { createIssue, updateIssue } from "@/actions/issueActions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IssueValidationSchema, issueSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Issue } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "./ui/use-toast"

interface IssueFormProps {
  issue?: Issue
}

export default function IssueForm({ issue }: IssueFormProps) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<IssueValidationSchema>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue?.title,
      description: issue?.description,
    },
  })

  const { toast } = useToast()

  const onSubmit = async (values: IssueValidationSchema) => {
    startTransition(async () => {
      try {
        if (issue) {
          await updateIssue(issue.id, values)
          toast({
            title: "Issue Updated Successfully!",
          })
        } else {
          await createIssue(values)
          toast({
            title: "Issue Created Successfully!",
          })
        }
      } catch (error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      }
    })
  }

  return (
    <section className="flex flex-col mx-auto space-y-5 max-w-5xl">
      <div>
        <h1 className="text-xl font-bold">Create new Issue</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Issue" />
                </FormControl>
                <FormDescription>
                  This is your Issue&apos;s title
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description..." {...field} />
                </FormControl>
                <FormDescription>
                  This is your Issue&apos;s Description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isPending && <Loader2 size={16} />}
            {issue ? "Edit Issue" : "Add Issue"}
          </Button>
        </form>
      </Form>
    </section>
  )
}
