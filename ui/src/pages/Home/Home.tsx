import React from "react";
import { CreateNote, HomeCard, SkeletonList } from "@/components";
import { Status, useGetNotesQuery } from "@/graphql/generated/schema";
import { useAuth } from "@/contexts/AuthContext";
import { MdNote } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { FaGoogle } from "react-icons/fa";

const Home: React.FC = () => {
    const auth = useAuth();
    const { t } = useTranslation();
    const { loading, error, data } = useGetNotesQuery({
        variables: { status: Status.Active },
        skip: !auth.isAuthenticated
    });

    if (loading || error) {
        return (
            <SkeletonList />
        );
    }

    if (!auth.isAuthenticated) {
        return (
            <>
                <div className="m-6">
                    <FaGoogle size={90} className="mx-auto text-gray-500" />
                    <p className="mt-6 select-none text-center text-2xl text-gray-600">
                        {t("pages.home.logged_out")}
                    </p>
                </div>
            </>
        )
    }

    if (data?.notes?.length === 0) {
        return (
            <>
                <div>
                    <CreateNote />
                </div>
                <div className="mt-6">
                    <MdNote size={110} className="mx-auto text-gray-500" />
                    <p className="text-center text-2xl text-gray-600">
                        {t("pages.home.no_notes")}
                    </p>
                </div>
            </>
        )
    }

    return (
        <>
            <CreateNote />
            {data?.notes.some((note) => note.pinned) &&
                <>
                    <div className="mb-4">
                        <p className="text-grey-500 ml-2 p-1 text-xs font-semibold">{t("pages.home.pinned")}</p>
                        <div className="flex flex-wrap items-center justify-center sm:items-start sm:justify-start">
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
                        <p className="text-grey-500 ml-2 p-1 text-xs font-semibold"> {t("pages.home.others")}</p>
                    }
                    <div className="flex flex-wrap items-center justify-center sm:items-start sm:justify-start">
                        {data?.notes?.filter((note) => !note.pinned).map((note) => (
                            <HomeCard key={note.id} note={note} />
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default Home
