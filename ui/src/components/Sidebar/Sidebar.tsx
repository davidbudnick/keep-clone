import React from "react";
import { BiTrash } from "react-icons/bi";
import { MdOutlineArchive, MdOutlineLightbulb } from "react-icons/md";
import SidebarItem from "@/components/Sidebar/SidebarItem/SidebarItem";
import { ROUTES } from "@/constants/routes";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const { t } = useTranslation();

    return (
        <aside id="logo-sidebar" className="fixed left-0 top-2 z-40  h-screen -translate-x-full border-r bg-white pt-16 transition-transform dark:bg-black sm:translate-x-0" aria-label="Sidebar">
            <div className="overflow-y-aut h-full">
                <ul className="space-y-1 font-medium">
                    <SidebarItem route={ROUTES.HOME} currentRoute={location.pathname} icon={MdOutlineLightbulb} label={t("pages.home.title")} />
                    <SidebarItem route={ROUTES.ARCHIVED} currentRoute={location.pathname} icon={MdOutlineArchive} label={t("pages.archived.title")} />
                    <SidebarItem route={ROUTES.TRASH} currentRoute={location.pathname} icon={BiTrash} label={t("pages.trash.title")} />
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
