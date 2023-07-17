import React from 'react';
import { Card, AddNote, Navbar, Sidebar } from 'src/components';
import { ROUTES } from 'src/constants/routes';
import { ListNotes } from 'src/api/notes';

const Notes: React.FC = async () => {
  const notes = await ListNotes("1");

  return (
    <div>
      <Navbar />
      <Sidebar currentRoute={ROUTES.NOTES} />
      <div className="ml-10 mt-14 p-4">
        <AddNote />
        <div className="flex flex-wrap justify-center">
          {notes?.map((note) => (
            <Card key={note.id} id={note.id} title={note.title} body={note.body} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;