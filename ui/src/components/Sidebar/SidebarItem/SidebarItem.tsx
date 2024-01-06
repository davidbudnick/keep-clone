import React from 'react';
import { IconType } from 'react-icons';
import classNames from 'classnames';

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
            <a href={route} className={classNames("flex items-center text-gray-900 rounded-full p-3 m-1 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer",
                {
                    "dark:bg-gray-700": route === currentRoute,
                })}>
                {React.createElement(icon, { size: iconSize })}
            </a>
        </li>
    )
}

export default SidebarItem