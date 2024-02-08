import React from "react";
import { Badge } from "@/components/ui/badge";
import { MdOutlinePushPin, MdPushPin, MdDelete, MdArchive } from "react-icons/md";
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

const HomeCard: React.FC<CardProps> = ({ note }) => {
    const [updateNote] = useUpdateNoteMutation(
        {
            update(cache) {
                cache.evict({ fieldName: "notes" });
            }
        }
    );

    return (
        <div key={note.id} className="group relative m-2 flex min-h-64 w-64 max-w-xs cursor-pointer flex-col items-start justify-between rounded-lg border border-gray-200 p-5 shadow">
            <div className="absolute right-2 top-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {note.pinned ?
                                <MdPushPin onClick={() => updateNote({
                                    variables: {
                                        input: {
                                            id: note.id,
                                            title: note.title,
                                            body: note.body,
                                            status: note.status,
                                            pinned: false,
                                        },
                                    },
                                })} size={20} /> :
                                <MdOutlinePushPin onClick={() => updateNote(
                                    {
                                        variables: {
                                            input: {
                                                id: note.id,
                                                title: note.title,
                                                body: note.body,
                                                status: note.status,
                                                pinned: true,
                                            }
                                        },
                                    }
                                )} size={20} className="duration-50 opacity-0 transition-opacity group-hover:opacity-100" />
                            }
                        </TooltipTrigger>
                        <TooltipContent>
                            {note.pinned ?
                                <p>Unpin Note</p> :
                                <p>Pin Note</p>
                            }
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
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
                    <span className='mr-4'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <MdDelete onClick={() => {
                                        updateNote({
                                            variables: {
                                                input: {
                                                    id: note.id,
                                                    title: note.title,
                                                    body: note.body,
                                                    status: Status.Deleted,
                                                    pinned: false,
                                                },
                                            },
                                        })
                                    }} size={20} className='duration-50 opacity-0 transition-opacity group-hover:opacity-100' />
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
                                    <MdArchive
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
                                    <p>Archive Note</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
