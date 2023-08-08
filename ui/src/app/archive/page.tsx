import React from 'react';
import { Navbar, Sidebar } from 'src/components';
import { ROUTES } from 'src/constants/routes';

const ArchivePage: React.FC = async () => {
    return (
        <div>
            <Navbar />
            <Sidebar currentRoute={ROUTES.ARCHIVE} />
            <div className="mt-14 p-4">
                <div className="flex flex-wrap justify-center">
                    {/* {notes?.map((note) => (
                        <Card key={note.id} id={note.id} title={note.title} body={note.body} />
                    ))} */}
                </div>
            </div>
        </div>

    )
}

export default ArchivePage;