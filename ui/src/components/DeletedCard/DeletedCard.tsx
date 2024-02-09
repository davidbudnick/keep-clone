import React from "react";
import { Badge } from "@/components/ui/badge";
import { MdDelete, MdRestore, MdUnarchive } from "react-icons/md";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Note, Status, useDeleteNoteMutation, useUpdateNoteMutation } from "@/graphql/generated/schema";
import { truncateBody, truncateTitle } from "@/lib/truncate";
import { useTranslation } from "react-i18next";

interface CardProps {
    note: Note;
}

const DeletedCard: React.FC<CardProps> = ({ note }) => {
    const { t } = useTranslation();
    const [updateNote] = useUpdateNoteMutation(
        {
            update(cache) {
                cache.evict({ fieldName: "notes" });
            }
        }
    );

    const [deleteNote] = useDeleteNoteMutation(
        {
            update(cache) {
                cache.evict({ fieldName: "notes" });
            }
        }
    );

    return (
        <div key={note.id} className="group relative m-2 flex min-h-64 w-64 max-w-xs cursor-pointer flex-col items-start justify-between rounded-lg border border-gray-200 p-5 shadow">
            <a>
                <div>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{truncateTitle(note.title)}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{truncateBody(note.title)}</p>
                </div>
            </a>
            <div className="pt-4">
                <Badge className="mt-2" variant="outline">
                    {note.status}
                </Badge>
                <Badge className="mb-8 mt-2" variant="secondary">
                    {new Date(note.updatedAt).toLocaleTimeString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                    })}
                </Badge>
                <div className="absolute bottom-2 left-4">
                    <span className="mr-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <MdUnarchive
                                        onClick={() => {
                                            updateNote({
                                                variables: {
                                                    input: {
                                                        id: note.id,
                                                        title: note.title,
                                                        body: note.body,
                                                        status: Status.Archived,
                                                        pinned: false,
                                                    },
                                                },
                                            })
                                        }}
                                        size={20} className='duration-50 opacity-0 transition-opacity group-hover:opacity-100' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{t("pages.trash.actions.archive")}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                    <span className="mr-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <MdRestore
                                        onClick={() => {
                                            updateNote({
                                                variables: {
                                                    input: {
                                                        id: note.id,
                                                        title: note.title,
                                                        body: note.body,
                                                        status: Status.Active,
                                                        pinned: false,
                                                    },
                                                },
                                            })
                                        }}
                                        size={20} className='duration-50 opacity-0 transition-opacity group-hover:opacity-100' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{t("pages.trash.actions.restore")}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                    <span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <MdDelete
                                        onClick={() => {
                                            deleteNote({
                                                variables: {
                                                    id: note.id,
                                                },
                                            })
                                        }}
                                        size={20} className='duration-50 opacity-0 transition-opacity group-hover:opacity-100' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{t("pages.trash.actions.delete")}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DeletedCard;
