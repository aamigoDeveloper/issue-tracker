import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
  return (
    <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="flex flex-col gap-5 space-y-1">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-[100px] w-[200px]" />
          <Skeleton className="h-[100px] w-[200px]" />
          <Skeleton className="h-[100px] w-[200px]" />
        </div>
        <Skeleton className="h-[300px] sm:w-[625px] w-[500px]" />
      </div>
      <Skeleton className="h-[430px] w-[400px]" />
    </div>
  )
}
