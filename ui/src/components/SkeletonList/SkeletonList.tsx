import { Skeleton } from "@/components/ui/skeleton"

const SkeletonList = () => {
    return (
        <div className="ml-10 mt-24 p-4">
            <div className='mx-6 mt-6 flex flex-wrap'>
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="m-4 flex min-h-64 w-64 max-w-xs cursor-pointer flex-col items-start justify-between rounded-lg border border-gray-200 p-6 shadow">
                        <Skeleton className="mb-2 h-[20px] w-[100px] rounded-full" />
                        <Skeleton className="mb-4 h-6 w-full rounded" />
                        <Skeleton className="h-[20px] w-[80px] rounded-full" />
                        <Skeleton className="mt-2 h-[20px] w-[80px] rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkeletonList
