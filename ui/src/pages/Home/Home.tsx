import React from "react";
import { List, CreateNote } from "@/components";
import { Status, useGetNotesQuery } from "@/graphql/generated/schema";

const Home: React.FC = () => {
    const { loading, error, data, refetch } = useGetNotesQuery({
        variables: { status: Status.Active },
    });

    return (
        <div className="ml-10 mt-14 p-4">
            <CreateNote />
            {data?.notes.some((note) => note.pinned) &&
                <>
                    <div className="mb-4">
                        <p className="ml-8 text-grey-500 text-xs font-semibold p-1">PINNED</p>
                        <List
                            loading={loading}
                            error={error}
                            notes={data?.notes.filter((note) => note.pinned)}
                            refetch={refetch}
                        />

                    </div>
                    <hr />
                </>
            }
            <div className="mt-4">
                <List
                    loading={loading}
                    error={error}
                    notes={data?.notes.filter((note) => !note.pinned)}
                    refetch={refetch}
                />
            </div>
        </div>
    )
}

export default Home