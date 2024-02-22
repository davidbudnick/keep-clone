import React from "react"
import { IconType } from "react-icons"

interface NavIconProps {
    icon: IconType;
    iconSize?: number;
    onClick?: () => void;
}

const NavIcon: React.FC<NavIconProps> = ({ icon, iconSize = 24, onClick }) => {
    return (
        <a type="button" onClick={onClick} className='md:mx-4 mx-2 cursor-pointer rounded-full'>
            {React.createElement(icon, { size: iconSize })}
        </a>
    )
}

export default NavIcon
