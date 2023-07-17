import React from 'react';
import { Navbar, Sidebar, Card } from 'src/components';
import { ROUTES } from 'src/constants/routes';
import { ListArchiveNotes } from 'src/api/notes';

const ArchivePage: React.FC = async () => {
    const notes = await ListArchiveNotes("1");
    return (
        <div>
            <Navbar />
            <Sidebar currentRoute={ROUTES.ARCHIVE} />
            <div className="mt-14 p-4">
                <div className="flex flex-wrap justify-center">
                    {notes?.map((note) => (
                        <Card key={note.id} id={note.id} title={note.title} body={note.body} />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ArchivePage;