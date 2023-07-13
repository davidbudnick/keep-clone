import React from 'react'
import { Navbar, Sidebar } from 'src/components'
import { ROUTES } from 'src/constants/routes'

const EditLabelsPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Sidebar currentRoute={ROUTES.EDIT_LABELS} />
            <div className="p-4 mt-14">
                <div className="flex flex-wrap justify-center">
                    {"edit-labels"}
                </div>
            </div>
        </div>

    )
}

export default EditLabelsPage;