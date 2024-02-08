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

    return (
        <div className="ml-10 mt-14 p-4">
            <div className="mb-4 mt-4 flex justify-center">
                <p className="italic">Notes in the Trash are deleted automatically after 7 days</p>
                {data?.notes?.length !== 0 &&
                    <button disabled={data?.notes?.length === 0} onClick={() => {
                        removeDeleted();
                        toast({
                            title: "Notes have been successfully deleted",
                        })
                    }} className="ml-4 cursor-pointer text-blue-500 hover:underline">Empty Trash</button>
                }
            </div>

            {data?.notes?.length === 0
                ?
                <div className="ml-12 flex h-[calc(100vh-17rem)] items-center justify-center p-4">
                    <div>
                        <FaTrashCan size={90} className="mx-auto text-gray-500" />
                        <p className="mt-8 text-center text-2xl text-gray-600">No notes in trash</p>
                    </div>
                </div>
                :
                <div className="ml-6 flex flex-wrap">
                    {data?.notes?.map((note) => (
                        <DeletedCard key={note.id} note={note} />
                    ))}
                </div>
            }
        </div >
    )
}

export default Trash
