import React from 'react'
import { IconType } from 'react-icons'

interface NavIconProps {
    icon: IconType;
    iconSize?: number;
}

const NavIcon: React.FC<NavIconProps> = ({ icon, iconSize = 24 }) => {
    return (
        <a type="button" className='dark:hover:bg-gray-700 p-3 rounded-full cursor-pointer'>
            {React.createElement(icon, { size: iconSize })}
        </a>
    )
}

export default NavIcon