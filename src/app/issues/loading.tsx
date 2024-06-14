import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="max-w-6xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
            <Skeleton className="h-[40px] w-[180px]" />
            <Skeleton className="h-[40px] w-[100px]" />
        </div>
        <Skeleton className="h-[480px] w-[1150px]" />
        <Skeleton className="h-[40px] w-[400px]" />
    </div>
  )
}