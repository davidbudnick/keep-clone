import React from 'react'
import { Navbar, Sidebar } from 'src/components'
import { ROUTES } from 'src/constants/routes'

const EditLabelsPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Sidebar currentRoute={ROUTES.EDIT_LABELS} />
            <div className="mt-14 p-4">
                <div className="flex flex-wrap justify-center">
                    {"edit-labels"}
                </div>
            </div>
        </div>

    )
}

export default EditLabelsPage;