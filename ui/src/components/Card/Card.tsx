import { Note } from '@/types/Note';
import React from 'react';
import { Badge } from "@/components/ui/badge"

interface CardProps {
    note: Note
}

const Card: React.FC<CardProps> = ({ note }) => {
    return (
        <div key={note.id} className="m-4 w-64 min-h-64 max-w-xs cursor-pointer rounded-lg border border-gray-200 p-6 shadow flex flex-col justify-between items-start">
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