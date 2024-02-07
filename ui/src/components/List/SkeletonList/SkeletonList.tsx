import { Skeleton } from "@/components/ui/skeleton"

const SkeletonList = () => {
    return (
        <div className='flex flex-wrap mx-6 mt-6'>
            {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="m-4 w-64 min-h-64 max-w-xs cursor-pointer rounded-lg border border-gray-200 p-6 shadow flex flex-col justify-between items-start">
                    <Skeleton className="w-[100px] h-[20px] mb-2 rounded-full" />
                    <Skeleton className="w-full h-6 mb-4 rounded" />
                    <Skeleton className="w-[80px] h-[20px] rounded-full" />
                    <Skeleton className="w-[80px] h-[20px] mt-2 rounded-full" />
                </div>
            ))}
        </div>
    )
}

export default SkeletonList