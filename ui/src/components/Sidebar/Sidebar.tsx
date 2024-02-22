import React from "react";
import { MdDelete } from "react-icons/md";
import { MdOutlineArchive, MdOutlineLightbulb } from "react-icons/md";
import SidebarItem from "@/components/Sidebar/SidebarItem/SidebarItem";
import { ROUTES } from "@/constants/routes";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const { t } = useTranslation();

    return (
        <aside id="logo-sidebar" className="fixed left-0 top-16 w-14 z-40 border-r h-screen bg-white transition-transform dark:bg-black sm:translate-x-0" aria-label="Sidebar">
            <div className="overflow-y-auto h-full">
                <ul className="space-y-1 font-medium">
                    <SidebarItem disabled={!isAuthenticated} route={ROUTES.HOME} currentRoute={location.pathname} icon={MdOutlineLightbulb} label={t("pages.home.title")} />
                    <SidebarItem disabled={!isAuthenticated} route={ROUTES.ARCHIVED} currentRoute={location.pathname} icon={MdOutlineArchive} label={t("pages.archived.title")} />
                    <SidebarItem disabled={!isAuthenticated} route={ROUTES.TRASH} currentRoute={location.pathname} icon={MdDelete} label={t("pages.trash.title")} />
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
