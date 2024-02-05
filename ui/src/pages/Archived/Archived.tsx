import React from 'react'
import { List, CreateNote } from '@/components'
import { NoteStatus } from '@/constants/status'

const Archived: React.FC = () => {
    return (
        <div className="ml-10 mt-14 p-4">
            <CreateNote />
            <List status={NoteStatus.ARCHIVED} />
        </div>
    )
}

export default Archived