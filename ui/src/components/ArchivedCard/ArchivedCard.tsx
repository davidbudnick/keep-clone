import React from "react";
import { Badge } from "@/components/ui/badge";
import { MdDelete, MdUnarchive } from "react-icons/md";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Note, Status, useUpdateNoteMutation } from "@/graphql/generated/schema";

interface CardProps {
    note: Note;
}

const ArchivedCard: React.FC<CardProps> = ({ note }) => {
    const [updateNote] = useUpdateNoteMutation(
        {
            update(cache) {
                cache.evict({ fieldName: "notes" });
            }
        }
    );

    return (
        <div key={note.id} className="m-2 w-64 min-h-64 max-w-xs cursor-pointer rounded-lg border border-gray-200 p-5 shadow flex flex-col justify-between items-start relative group">
            <a>
                <div>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{note.title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{note.body}</p>
                </div>
            </a>
            <div className="pt-4">
                <Badge className="mt-2" variant="outline">
                    {note.status}
                </Badge>
                <Badge className="mt-2 mb-8" variant="secondary">
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
                    <span className='mr-4'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <MdDelete onClick={() => {
                                        updateNote({
                                            variables: {
                                                id: note.id,
                                                title: note.title,
                                                body: note.body,
                                                status: Status.Deleted,
                                                pinned: false,
                                            },
                                        })
                                    }} size={20} className='opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Delete Note</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                    <span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <MdUnarchive
                                        onClick={() => {
                                            updateNote({
                                                variables: {
                                                    id: note.id,
                                                    title: note.title,
                                                    body: note.body,
                                                    status: Status.Active,
                                                    pinned: false,
                                                },
                                            })
                                        }}
                                        size={20} className='opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Unarchive</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ArchivedCard;
