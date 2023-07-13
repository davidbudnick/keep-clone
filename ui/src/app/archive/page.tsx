import React from 'react'
import { Navbar, Sidebar } from 'src/components'
import { ROUTES } from 'src/constants/routes'

const ArchivePage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Sidebar currentRoute={ROUTES.ARCHIVE} />
            <div className="p-4 mt-14">
                <div className="flex flex-wrap justify-center">
                    {"archive"}
                </div>
            </div>
        </div>

    )
}

export default ArchivePage;