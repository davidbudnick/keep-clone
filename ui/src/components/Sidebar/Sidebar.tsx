import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineArchive, MdOutlineLightbulb } from 'react-icons/md';
import { SidebarItem } from './SidebarItem';
import { ROUTES } from '@/constants/routes';
import { useLocation } from 'react-router-dom';



const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <aside id="logo-sidebar" className="fixed left-0 top-2 z-40  h-screen -translate-x-full border-r transition-transform sm:translate-x-0 pt-16 dark:bg-black bg-white" aria-label="Sidebar">
            <div className="h-full overflow-y-aut">
                <ul className="space-y-2 font-medium">
                    <SidebarItem route={ROUTES.HOME} currentRoute={location.pathname} icon={MdOutlineLightbulb} label="Notes" />
                    <SidebarItem route={ROUTES.ARCHIVED} currentRoute={location.pathname} icon={MdOutlineArchive} label="Archive" />
                    <SidebarItem route={ROUTES.TRASH} currentRoute={location.pathname} icon={BiTrash} label="Trash" />
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar