import React from 'react';
import { Card, AddNote, Navbar, Sidebar } from 'src/components';
import { ROUTES } from 'src/constants/routes';

const Notes: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Sidebar currentRoute={ROUTES.NOTES} />
      <div className="ml-10 mt-14 p-4">
        <AddNote />
        <div className="flex flex-wrap justify-center">
          {Array.from(Array(12).keys()).map((i) => (
            <Card key={i} title='Learn Next JS' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.s' />
          ))}
        </div>
      </div>
    </div>

  );
};

export default Notes;