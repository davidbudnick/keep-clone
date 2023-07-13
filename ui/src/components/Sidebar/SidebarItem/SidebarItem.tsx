import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import classNames from 'classnames';

interface SidebarItemProps {
    route?: string;
    currentRoute: string;
    label: string;
    icon: IconType;
    iconSize?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ route = "", currentRoute = "", label, icon, iconSize = 24 }) => {
    return (
        <li>
            <Link href={route} className={classNames("flex items-center text-gray-900 rounded-full p-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer",
                {
                    "bg-gray-700": route === currentRoute,
                })}>
                {React.createElement(icon, { size: iconSize })}
            </Link>
        </li>
    )
}

export default SidebarItem