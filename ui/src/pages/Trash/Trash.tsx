import React from 'react'
import { CreateNote, List } from '@/components'
import { NoteStatus } from '@/constants/status'

const Trash: React.FC = () => {
    return (
        <div className="ml-10 mt-14 p-4">
            <CreateNote />
            <List status={NoteStatus.DELETED} />
        </div>
    )
}

export default Trash