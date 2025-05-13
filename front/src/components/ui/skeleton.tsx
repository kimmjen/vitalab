import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
        className
      )}
      {...props}
    />
  );
}

export function DataTableSkeleton() {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[150px]" />
      </div>

      <div className="rounded-md border">
        <div className="border-b bg-gray-50 dark:bg-gray-900">
          <div className="grid grid-cols-4 p-4">
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-6 w-[80%]" />
          </div>
        </div>
        <div className="space-y-6 p-4">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="grid grid-cols-4 gap-4">
                <Skeleton className="h-6 w-[80%]" />
                <Skeleton className="h-6 w-[80%]" />
                <Skeleton className="h-6 w-[80%]" />
                <Skeleton className="h-6 w-[80%]" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800">
      <div className="space-y-4">
        <Skeleton className="h-6 w-[50%]" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[60%]" />
        <div className="pt-2">
          <Skeleton className="h-9 w-[40%]" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="rounded-lg border bg-white p-4 dark:bg-gray-800"
          >
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-[40%]" />
              <Skeleton className="h-8 w-[60%]" />
              <Skeleton className="h-2 w-full" />
            </div>
          </div>
        ))}
    </div>
  );
} 