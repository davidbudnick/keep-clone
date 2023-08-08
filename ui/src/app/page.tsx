import React from 'react';
import { NotesList, AddNote, Navbar, Sidebar } from 'src/components';
import { ROUTES } from 'src/constants/routes';
import { NotesApi, Configuration, Note } from 'src/client';

const Notes: React.FC = async () => {
  //TODO: - move this to a service
  const configuration = new Configuration({ basePath: "http://localhost:3333/v1", apiKey: "1" })
  const API = new NotesApi(configuration)
  const notes = await API.listActiveNotes()

  return (
    <div>
      <Navbar />
      <Sidebar currentRoute={ROUTES.NOTES} />
      <div className="ml-10 mt-14 p-4">
        <AddNote />
        <NotesList n={notes.data} />
      </div>
    </div>
  );
};

export default Notes;