import React from "react";
import { Badge } from "@/components/ui/badge";
import { MdUnarchive } from "react-icons/md";
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

const DeletedCard: React.FC<CardProps> = ({ note }) => {
    const [updateNote] = useUpdateNoteMutation(
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
                                                    status: Status.Archived,
                                                    pinned: false,
                                                },
                                            })
                                        }}
                                        size={20} className='opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Unarchive</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                    {/* //TODO: add delete note button */}
                </div>
            </div>
        </div>
    );
};

export default DeletedCard;
