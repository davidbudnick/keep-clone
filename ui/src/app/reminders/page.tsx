import React from 'react'
import { AddNote, Navbar, Sidebar } from 'src/components'
import { ROUTES } from 'src/constants/routes'

const RemindersPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Sidebar currentRoute={ROUTES.REMINDERS} />
            <div className="p-4 mt-14 ml-10">
                <AddNote />
            </div>
        </div>

    )
}

export default RemindersPage;