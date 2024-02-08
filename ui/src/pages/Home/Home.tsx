import React, { useEffect } from "react";
import { CreateNote, HomeCard, SkeletonList } from "@/components";
import { Status, useGetNotesQuery } from "@/graphql/generated/schema";
import { useAuth } from "@/contexts/AuthContext";
import { MdOutlineLightbulb } from "react-icons/md";

const Home: React.FC = () => {
    const auth = useAuth();
    const { loading, error, data, refetch } = useGetNotesQuery({
        variables: { status: Status.Active },
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
                <div className="ml-10 mt-14 p-4">
                    <CreateNote />
                </div>
                <div className="flex items-center ml-10 p-4 justify-center h-[calc(100vh-18rem)]">
                    <div>
                        <MdOutlineLightbulb size={110} className="mx-auto text-gray-500" />
                        <p className="text-center text-2xl mt-6 text-gray-300">
                            No Notes
                        </p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="ml-10 mt-14 p-4">
            <CreateNote />
            {data?.notes.some((note) => note.pinned) &&
                <>
                    <div className="mb-4">
                        <p className="ml-8 text-grey-500 text-xs font-semibold p-1">PINNED</p>
                        <div className="flex flex-wrap ml-6">
                            {data?.notes?.filter((note) => note.pinned).map((note) => (
                                <HomeCard key={note.id} note={note} />
                            ))}
                        </div>

                    </div>
                    <hr />
                </>
            }
            {data?.notes.some((note) => !note.pinned) &&
                <div className="mt-4">
                    {data?.notes.some((note) => note.pinned) &&
                        <p className="ml-8 text-grey-500 text-xs font-semibold p-1">OTHERS</p>
                    }
                    <div className="flex flex-wrap ml-6">
                        {data?.notes?.filter((note) => !note.pinned).map((note) => (
                            <HomeCard key={note.id} note={note} />
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Home
