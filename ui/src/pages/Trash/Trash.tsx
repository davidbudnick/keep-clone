import React from "react"
import { DeletedCard, SkeletonList } from "@/components"
import { Status, useGetNotesQuery, useRemoveDeletedMutation } from "@/graphql/generated/schema";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const Trash: React.FC = () => {
    const { toast } = useToast()
    const auth = useAuth();
    const { t } = useTranslation();
    const { loading, error, data } = useGetNotesQuery({
        variables: { status: Status.Deleted },
        skip: !auth.isAuthenticated
    });

    const [removeDeleted] = useRemoveDeletedMutation(
        {
            update(cache) {
                cache.evict({ fieldName: "notes" });
            }
        }
    );

    if (loading || error) {
        return (
            <SkeletonList />
        );
    }

    if (data?.notes?.filter(
        (note) => note.status === Status.Deleted
    )?.length === 0) {
        return (
            <>
                <div className="mt-4">
                    <MdDelete size={110} className="mx-auto text-gray-500" />
                    <p className="mt-4 text-center text-2xl text-gray-600">{t("pages.trash.no_notes")}</p>
                </div>
            </>

        )
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-center items-center mx-2 my-4">
                <p className="bold text-center sm:text-left">{t("pages.trash.auto_delete")}</p>
                {data?.notes?.filter(
                    (note) => note.status === Status.Deleted
                )?.length !== 0 &&
                    <Button
                        variant="outline"
                        disabled={data?.notes?.filter(
                            (note) => note.status === Status.Deleted
                        )?.length === 0}
                        onClick={() => {
                            removeDeleted();
                            toast({
                                title: t("pages.trash.notes_deleted"),
                            })
                        }}
                        className="mt-4 sm:mt-0 sm:ml-4 px-4 py-2 text-sm sm:text-base cursor-pointer"
                    >
                        {t("pages.trash.empty_trash")}
                    </Button>
                }
            </div>
            <div className="flex flex-wrap items-center justify-center sm:items-start sm:justify-start">
                {data?.notes?.filter(
                    (note) => note.status === Status.Deleted)
                    .map((note) => (
                        <DeletedCard key={note.id} note={note} />
                    ))}
            </div>
        </>
    )
}

export default Trash
