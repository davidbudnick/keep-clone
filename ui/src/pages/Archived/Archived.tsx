import React, { useEffect } from "react"
import { Status, useGetNotesQuery } from "@/graphql/generated/schema";
import { SkeletonList } from "@/components";
import { useAuth } from "@/contexts/AuthContext";
import { ArchivedCard } from "@/components";
import { MdOutlineArchive } from "react-icons/md";

const Archived: React.FC = () => {
    const auth = useAuth();
    const { loading, error, data, refetch } = useGetNotesQuery({
        variables: { status: Status.Archived },
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
                        <MdOutlineArchive size={110} className="mx-auto text-gray-500" />
                        <p className="text-center text-2xl mt-4 text-gray-300">No notes archived</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="ml-10 mt-28 p-4">
            <div className="flex flex-wrap ml-6">
                {data?.notes?.map((note) => (
                    <ArchivedCard key={note.id} note={note} />
                ))}
            </div>
        </div>
    )
}

export default Archived
