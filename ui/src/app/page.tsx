import React from 'react';
import { NotesList, AddNote, Navbar, Sidebar } from 'src/components';
import { ROUTES } from 'src/constants/routes';
import { ListNotes, Note } from 'src/api/notes';

const Notes: React.FC = async () => {
  const notes = await ListNotes("1");

  return (
    <div>
      <Navbar />
      <Sidebar currentRoute={ROUTES.NOTES} />
      <div className="ml-10 mt-14 p-4">
        <AddNote />
        <NotesList n={notes} />
      </div>
    </div>
  );
};

export default Notes;