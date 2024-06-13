"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "./ui/button"

interface PaginationProps {
  currentPage: number
  totalIssues: number
  pageSize: number
}

export default function PaginationIssue({
  currentPage,
  totalIssues,
  pageSize,
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)

    params.set("page", page.toString())
    router.push(`?${params.toString()}`)
  }

  const pageCount = Math.ceil(totalIssues / pageSize)

  if (pageCount <= 1) return null
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={currentPage === 1}
            variant={"outline"}
            onClick={() => changePage(1)}
          >
            First Page
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={currentPage === 1}
            variant={"ghost"}
            onClick={() => changePage(currentPage - 1)}
          >
            <ChevronLeftIcon />
          </Button>
        </PaginationItem>
        <p className="text-zinc-600 font-semibold">
          Page {currentPage} of {pageCount}
        </p>
        <PaginationItem>
          <Button
            disabled={currentPage === pageCount}
            variant={"ghost"}
            onClick={() => changePage(currentPage + 1)}
          >
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={currentPage === pageCount}
            variant={"outline"}
            onClick={() => changePage(pageCount)}
          >
            Last Page
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
