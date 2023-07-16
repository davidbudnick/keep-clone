import React from 'react'
import { AddNote, Navbar, Sidebar } from 'src/components'
import { ROUTES } from 'src/constants/routes'

const RemindersPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Sidebar currentRoute={ROUTES.REMINDERS} />
            <div className="ml-10 mt-14 p-4">
                <AddNote />
            </div>
        </div>

    )
}

export default RemindersPage;