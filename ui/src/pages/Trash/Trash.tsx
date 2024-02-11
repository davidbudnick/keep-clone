import React from "react"
import { DeletedCard, SkeletonList } from "@/components"
import { Status, useGetNotesQuery, useRemoveDeletedMutation } from "@/graphql/generated/schema";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { FaTrashCan } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Trash: React.FC = () => {
    const { toast } = useToast()
    const auth = useAuth();
    const { t } = useTranslation();
    const [removeDeleted] = useRemoveDeletedMutation(
        {
            update(cache) {
                cache.evict({ fieldName: "notes" });
            }
        }
    );

    const { loading, error, data } = useGetNotesQuery({
        variables: { status: Status.Deleted },
        skip: !auth.isAuthenticated
    });

    if (loading || error) {
        return (
            <SkeletonList />
        );
    }

    if (data?.notes?.length === 0) {
        return (
            <div className="ml-12 flex h-[calc(100vh-17rem)] items-center justify-center p-4">
                <div>
                    <FaTrashCan size={90} className="mx-auto text-gray-500" />
                    <p className="mt-8 text-center text-2xl text-gray-600">{t("pages.trash.no_notes")}</p>
                </div>
            </div>

        )
    }

    return (
        <div className="ml-10 mt-14 p-4">
            <div className="mb-4 mt-4 flex justify-center">
                <p className="italic">{t("pages.trash.auto_delete")}</p>
                {data?.notes?.length !== 0 &&
                    <button disabled={data?.notes?.length === 0} onClick={() => {
                        removeDeleted();
                        toast({
                            title: t("pages.trash.notes_deleted"),
                        })
                    }} className="ml-4 cursor-pointer text-blue-500 hover:underline">{t("pages.trash.empty_trash")}</button>
                }
            </div>
            <div className="ml-6 flex flex-wrap">
                {data?.notes?.map((note) => (
                    <DeletedCard key={note.id} note={note} />
                ))}
            </div>
        </div >
    )
}

export default Trash
