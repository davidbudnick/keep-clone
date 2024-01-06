import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineArchive, MdOutlineEdit, MdOutlineLightbulb } from 'react-icons/md';
import { AiOutlineBell } from 'react-icons/ai';
import { SidebarItem } from './SidebarItem';
import { ROUTES } from '@/constants/routes';


interface SidebarProps {
    currentRoute: string
}

const Sidebar: React.FC<SidebarProps> = ({ currentRoute }) => {
    return (
        <aside id="logo-sidebar" className="fixed left-0 top-2 z-40  h-screen -translate-x-full border-r  transition-transform  sm:translate-x-0 mt-16" aria-label="Sidebar">
            <div className="h-full overflow-y-aut">
                <ul className="space-y-2 font-medium">
                    <SidebarItem route={ROUTES.NOTES} currentRoute={currentRoute} icon={MdOutlineLightbulb} label="Notes" />
                    <SidebarItem route={ROUTES.REMINDERS} currentRoute={currentRoute} icon={AiOutlineBell} label="Reminders" />
                    <SidebarItem route={ROUTES.EDIT_LABELS} currentRoute={currentRoute} icon={MdOutlineEdit} label="Edit Labels" />
                    <SidebarItem route={ROUTES.ARCHIVE} currentRoute={currentRoute} icon={MdOutlineArchive} label="Archive" />
                    <SidebarItem route={ROUTES.TRASH} currentRoute={currentRoute} icon={BiTrash} label="Trash" />
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar