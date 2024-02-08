import React, { useEffect } from "react"
import { DeletedCard, SkeletonList } from "@/components"
import { Status, useGetNotesQuery, useRemoveDeletedMutation } from "@/graphql/generated/schema";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { FaTrashCan } from "react-icons/fa6";


const Trash: React.FC = () => {
    const { toast } = useToast()
    const auth = useAuth();
    const [removeDeleted] = useRemoveDeletedMutation(
        {
            update(cache) {
                cache.evict({ fieldName: "notes" });
            }
        }
    );

    const { loading, error, data, refetch } = useGetNotesQuery({
        variables: { status: Status.Deleted },
    });

    useEffect(() => {
        refetch();
    }, [auth.isAuthenticated]);

    if (loading || error) {
        return (
            <SkeletonList />
        );
    }

    if (data?.notes?.length === 0) {
        return (
            <>
                <div className="flex items-center ml-10 p-4 justify-center h-screen">
                    <div>
                        <FaTrashCan size={90} className="mx-auto text-gray-500" />
                        <p className="text-center text-2xl mt-8 text-gray-300">No notes in trash</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="ml-10 mt-14 p-4">
            <div className="flex justify-center mt-4 mb-4">
                <p className="italic">Notes in the Trash are deleted automatically after 7 days</p>
                {data?.notes?.length !== 0 &&
                    <button disabled={data?.notes?.length === 0} onClick={() => {
                        removeDeleted();
                        toast({
                            title: "Notes have been successfully deleted",
                        })
                    }} className="ml-4 text-blue-500 hover:underline cursor-pointer">Empty Trash</button>
                }
            </div>
            <div className="flex flex-wrap ml-6">
                {data?.notes?.map((note) => (
                    <DeletedCard key={note.id} note={note} />
                ))}
            </div>
        </div >
    )
}

export default Trash
