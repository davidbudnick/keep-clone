import React from 'react';
import { Navbar, Sidebar, Card } from 'src/components';
import { ROUTES } from 'src/constants/routes';

const TrashPage: React.FC = async () => {
    // const notes = await ListDeletedNotes("1");
    return (
        <div>
            <Navbar />
            <Sidebar currentRoute={ROUTES.TRASH} />
            <div className="mt-20 p-4">
                <div className="flex flex-wrap justify-center italic">
                    {"Notes in Trash are deleted after 7 days."}
                    <div className='mt-10'>
                        {/* {notes?.map((note) => (
                            <Card key={note.id} id={note.id} title={note.title} body={note.body} />
                        ))} */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TrashPage;