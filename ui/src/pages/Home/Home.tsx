import React from "react";
import { List, CreateNote } from "@/components";
import { NoteStatus } from "@/constants/status";

const Home: React.FC = () => {
    return (
        <div className="ml-10 mt-14 p-4">
            <CreateNote />
            <List status={NoteStatus.ACTIVE} />
        </div>
    )
}

export default Home