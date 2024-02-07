import { cn } from '@/lib/utils';
import React from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
    route?: string;
    currentRoute: string;
    label: string;
    icon: IconType;
    iconSize?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ route = "", currentRoute = "", icon, iconSize = 24 }) => {
    return (
        <li>
            <Link to={route} className={cn("flex items-center text-gray-900 rounded-full p-3 m-1 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer",
                {
                    "dark:bg-gray-700 bg-gray-200": route === currentRoute,
                })}>
                {React.createElement(icon, { size: iconSize })}
            </Link>
        </li>
    )
}

export default SidebarItem