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
import { useMediaQuery } from "react-responsive";
import { DEFUALT_MOBILE_WIDTH } from "@/constants/mobile";

interface SidebarItemProps {
    route?: string;
    currentRoute: string;
    label: string;
    icon: IconType;
    iconSize?: number;
    disabled?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ route, currentRoute, label, icon, iconSize = 24, disabled }) => {
    const isMobile = useMediaQuery({ maxWidth: DEFUALT_MOBILE_WIDTH });

    if (disabled) {
        return (
            <span className="group m-1 flex cursor-not-allowed items-center rounded-full p-3 text-gray-900  dark:text-white">
                {React.createElement(icon, { size: iconSize })}
            </span>
        )
    }
    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link to={route || ""} className={cn("flex items-center text-gray-900 rounded-full p-3 m-1 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer",
                            {
                                "dark:bg-gray-700 bg-gray-200": route === currentRoute,
                            })}>
                            {React.createElement(icon, { size: iconSize })}
                        </Link>
                    </TooltipTrigger>

                    {!isMobile &&
                        <TooltipContent side="right">
                            <p>{label}</p>
                        </TooltipContent>
                    }

                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default SidebarItem
