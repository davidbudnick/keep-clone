import React, { useEffect } from "react";
import { CreateNote, HomeCard, SkeletonList } from "@/components";
import { Status, useGetNotesQuery } from "@/graphql/generated/schema";
import { useAuth } from "@/contexts/AuthContext";
import { MdOutlineLightbulb } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { FaGoogle } from "react-icons/fa";

const Home: React.FC = () => {
    const auth = useAuth();
    const { t } = useTranslation();
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

    if (!auth.isAuthenticated) {
        return (
            <div className="flex h-[calc(100vh-35rem)] items-center justify-center p-4">
                <div>
                    <FaGoogle size={90} className="mx-auto text-gray-500" />
                    <p className="mt-6 select-none text-center text-2xl text-gray-600">
                        {t("pages.home.logged_out")}
                    </p>
                </div>
            </div>
        )
    }

    if (data?.notes?.length === 0) {
        return (
            <div>
                <div className="ml-10 mt-14 p-4">
                    <CreateNote />
                </div>
                <div className="ml-10 flex h-[calc(100vh-35rem)] items-center justify-center p-4">
                    <div>
                        <MdOutlineLightbulb size={110} className="mx-auto text-gray-500" />
                        <p className="mt-6 text-center text-2xl text-gray-600">
                            {t("pages.home.no_notes")}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="ml-10 mt-14 p-4">
            <CreateNote />
            {data?.notes.some((note) => note.pinned) &&
                <>
                    <div className="mb-4">
                        <p className="text-grey-500 ml-8 p-1 text-xs font-semibold">{t("pages.home.pinned")}</p>
                        <div className="ml-6 flex flex-wrap">
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
                        <p className="text-grey-500 ml-8 p-1 text-xs font-semibold"> {t("pages.home.others")}</p>
                    }
                    <div className="ml-6 flex flex-wrap">
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
