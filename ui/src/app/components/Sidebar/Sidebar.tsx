import React from 'react'
import { BiTrash } from 'react-icons/bi'
import { MdOutlineArchive, MdOutlineEdit, MdOutlineLightbulb } from 'react-icons/md'
import { AiOutlineBell } from 'react-icons/ai'
import { SidebarItem } from './SidebarItem'
import classNames from 'classnames'

interface SidebarProps {
    open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
    return (
        <>
            <aside id="logo-sidebar" className={classNames("fixed top-2 left-0 z-40  h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700",
                {
                    "w-64": open,
                }
            )} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <SidebarItem icon={MdOutlineLightbulb} label="Notes" open={open} />
                        <SidebarItem icon={AiOutlineBell} label="Reminders" open={open} />
                        <SidebarItem icon={MdOutlineEdit} label="Edit Labels" open={open} />
                        <SidebarItem icon={MdOutlineArchive} label="Archive" open={open} />
                        <SidebarItem icon={BiTrash} label="Trash" open={open} />
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar