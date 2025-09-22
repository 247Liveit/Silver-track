import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md  ", className)}
      {...props}
    />
  )
}
function SkeletonBig() {
  return (
    <div className="p-5">
      <h5 className="text-center font-bold">Please Wait...</h5>
      <Skeleton className="h-40 w-full mb-4 bg-gray-300" />
      <Skeleton className="h-10 w-full mb-4 bg-gray-300" />
      <Skeleton className="h-10 w-full mb-4 bg-gray-300" />
      <Skeleton className="h-10 w-full mb-4 bg-gray-300" />
      <Skeleton className="h-10 w-full mb-4 bg-gray-300" />
      <Skeleton className="h-10 w-full mb-4 bg-gray-300" />
      <Skeleton className="h-10 w-full mb-4 bg-gray-300" />
      <Skeleton className="h-10 w-full mb-4 bg-gray-300" />
      <Skeleton className="h-10 w-full mb-4 bg-gray-300" />
    </div>
  )
}
export { Skeleton ,SkeletonBig}
