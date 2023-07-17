'use client';
import React from 'react';
import { UpdateNote, NoteStatus } from 'src/api/notes';

interface CardProps {
    id: string;
    title: string;
    body: string;
}

const Card: React.FC<CardProps> = ({ id, title, body }) => {
    return (
        <a className="m-4 block max-w-xs cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{body}</p>
            <div className="mt-4 flex justify-end">
                <button onClick={() => {
                    UpdateNote("1", id, {
                        title: title,
                        body: body,
                        status: NoteStatus.ARCHIVED
                    })
                }
                } className="mr-2 rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                    Archive
                </button>
            </div>
        </a>
    );
};

export default Card;