import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarItemProps {
    route?: string;
    currentRoute: string;
    label: string;
    icon: IconType;
    iconSize?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ route = "", currentRoute = "", label, icon, iconSize = 24 }) => {
    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link to={route} className={cn("flex items-center text-gray-900 rounded-full p-3 m-1 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer",
                            {
                                "dark:bg-gray-700 bg-gray-200": route === currentRoute,
                            })}>
                            {React.createElement(icon, { size: iconSize })}
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>{label}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default SidebarItem
