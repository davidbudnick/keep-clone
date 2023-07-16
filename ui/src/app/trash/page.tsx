import React from 'react'
import { Navbar, Sidebar } from 'src/components'
import { ROUTES } from 'src/constants/routes'

const TrashPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Sidebar currentRoute={ROUTES.TRASH} />
            <div className="mt-20 p-4">
                <div className="flex flex-wrap justify-center italic">
                    {"Notes in Trash are deleted after 7 days."}
                </div>
            </div>
        </div>

    )
}

export default TrashPage;