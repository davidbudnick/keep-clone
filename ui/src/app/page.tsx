"use client";
import React, { useState } from 'react';
import { Card, Sidebar, Navbar } from './components';
import classNames from 'classnames';

const HomePage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <Sidebar open={open} />
      <div className={classNames(
        "p-4",
        {
          "ml-64": open,
          "ml-16": !open
        }
      )}>
        <div className="p-4 mt-14">
          <div className="flex flex-wrap justify-center">
            {Array.from(Array(14)).map((i) => (
              <Card key={i} title="Learn NextJS" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;