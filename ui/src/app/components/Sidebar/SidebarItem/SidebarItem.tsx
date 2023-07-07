import React from 'react'
import { IconType } from 'react-icons'


interface SidebarItemProps {
    label: string;
    icon: IconType;
    iconSize?: number;
    open: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon, iconSize = 24, open }) => {
    return (
        <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {React.createElement(icon, { size: iconSize })}
                {open &&
                    <>
                        <span className="ml-3">{label}</span>
                    </>
                }

            </a>
        </li>
    )
}

export default SidebarItem