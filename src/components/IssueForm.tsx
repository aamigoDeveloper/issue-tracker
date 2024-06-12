"use client"

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
import { useForm } from "react-hook-form"
import { IssueValidationSchema, issueSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssue } from "@/actions/actions"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { useTransition } from "react"

export default function IssueForm() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<IssueValidationSchema>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const onSubmit = async (values: IssueValidationSchema) => {
    startTransition(async () => {
      await createIssue(values)
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
            {isPending ? <Loader2 size={16} /> : "Add Issue"}
          </Button>
        </form>
      </Form>
    </section>
  )
}
