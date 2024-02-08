import React, { useEffect } from "react";
import { CreateNote, HomeCard, SkeletonList } from "@/components";
import { Status, useGetNotesQuery } from "@/graphql/generated/schema";
import { useAuth } from "@/contexts/AuthContext";

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