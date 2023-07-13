import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineArchive, MdOutlineEdit, MdOutlineLightbulb } from 'react-icons/md';
import { AiOutlineBell } from 'react-icons/ai';
import { SidebarItem } from './SidebarItem';
import { ROUTES } from 'src/constants/routes';


interface SidebarProps {
    currentRoute: string
}

const Sidebar: React.FC<SidebarProps> = ({ currentRoute }) => {
    return (
        <>
            <aside id="logo-sidebar" className={"fixed top-2 left-0 z-40  h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"} aria-label="Sidebar">
                <div className="h-full px-1 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <SidebarItem route={ROUTES.NOTES} currentRoute={currentRoute} icon={MdOutlineLightbulb} label="Notes" />
                        <SidebarItem route={ROUTES.REMINDERS} currentRoute={currentRoute} icon={AiOutlineBell} label="Reminders" />
                        <SidebarItem route={ROUTES.EDIT_LABELS} currentRoute={currentRoute} icon={MdOutlineEdit} label="Edit Labels" />
                        <SidebarItem route={ROUTES.ARCHIVE} currentRoute={currentRoute} icon={MdOutlineArchive} label="Archive" />
                        <SidebarItem route={ROUTES.TRASH} currentRoute={currentRoute} icon={BiTrash} label="Trash" />
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar