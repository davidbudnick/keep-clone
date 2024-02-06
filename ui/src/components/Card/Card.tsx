import React from 'react';
import { Badge } from "@/components/ui/badge";
import { MdOutlinePushPin } from "react-icons/md";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Note, useUpdateNoteMutation } from '@/graphql/generated/schema';

interface CardProps {
    note: Note;
}

const Card: React.FC<CardProps> = ({ note }) => {
    const [updateNote] = useUpdateNoteMutation({
        variables: {
            id: note.id,
            title: note.title,
            body: note.body,
            status: note.status,
            pinned: !note.pinned,
        },
    });

    return (
        <div key={note.id} className="m-4 w-64 min-h-64 max-w-xs cursor-pointer rounded-lg border border-gray-200 p-6 shadow flex flex-col justify-between items-start relative group">
            <div className="absolute top-2 right-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><MdOutlinePushPin onClick={() => updateNote()} size={20} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" /></TooltipTrigger>
                        <TooltipContent>
                            <p>Add to Favorites</p>
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
                <Badge variant="default">{note.status}</Badge>
                <Badge className="mt-2 ml-2" variant="secondary">
                    {new Date(note.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Badge>
            </div>
        </div>
    );
};

export default Card;