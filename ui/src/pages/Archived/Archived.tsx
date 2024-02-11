import React from "react"
import { Status, useGetNotesQuery } from "@/graphql/generated/schema";
import { SkeletonList } from "@/components";
import { useAuth } from "@/contexts/AuthContext";
import { ArchivedCard } from "@/components";
import { MdOutlineArchive } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Archived: React.FC = () => {
    const auth = useAuth();
    const { t } = useTranslation();
    const { loading, error, data } = useGetNotesQuery({
        variables: { status: Status.Archived },
        skip: !auth.isAuthenticated
    });

    if (loading || error) {
        return (
            <SkeletonList />
        );
    }

    if (data?.notes?.length === 0) {
        return (
            <>
                <div className="ml-10 flex h-[calc(100vh-17rem)]  items-center justify-center p-4">
                    <div>
                        <MdOutlineArchive size={110} className="mx-auto text-gray-500" />
                        <p className="mt-4 text-center text-2xl text-gray-600">{t("pages.archived.no_notes")}</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="ml-10 mt-28 p-4">
            <div className="ml-6 flex flex-wrap">
                {data?.notes?.map((note) => (
                    <ArchivedCard key={note.id} note={note} />
                ))}
            </div>
        </div>
    )
}

export default Archived
