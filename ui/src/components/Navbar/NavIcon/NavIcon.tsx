import React from 'react'
import { IconType } from 'react-icons'

interface NavIconProps {
    icon: IconType;
    iconSize?: number;
}

const NavIcon: React.FC<NavIconProps> = ({ icon, iconSize = 24 }) => {
    return (
        <a type="button" className='cursor-pointer rounded-full p-3 dark:hover:bg-gray-700'>
            {React.createElement(icon, { size: iconSize })}
        </a>
    )
}

export default NavIcon