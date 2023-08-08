'use client';
import React, { useState, useEffect } from 'react'
import { Note } from 'src/client';
import Card from 'src/components/Card/Card';

interface INotesListProps {
    n: Note[];
}

const NotesList: React.FC<INotesListProps> = ({ n }) => {
    const [notes, setNotes] = useState<Note[]>(n)

    useEffect(() => {
        setNotes(notes)
    }, [notes])

    return (
        <div className="flex flex-wrap justify-center">
            {notes?.map((note) => (
                <Card key={note.id} id={note.id} title={note.title} body={note.body} />
            ))}
        </div>
    )
}

export default NotesList