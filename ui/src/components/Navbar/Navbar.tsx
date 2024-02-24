import React from "react"
import { Switch } from "@/components/ui/switch"
import { useTheme, DARK, LIGHT } from "@/components/theme-provider"
import { ROUTES } from "@/constants/routes";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { localStorageKey, locales } from "@/locales/i18n";

const Navbar: React.FC = () => {
    const { setTheme, theme } = useTheme()
    const location = useLocation();
    const { user, isAuthenticated, logout, login } = useAuth();
    const { t, i18n } = useTranslation();

    const GetPageName = () => {
        if (location.pathname === ROUTES.HOME) {
            return t("pages.home.title")
        } else if (location.pathname === ROUTES.ARCHIVED) {
            return t("pages.archived.title")
        } else if (location.pathname === ROUTES.TRASH) {
            return t("pages.trash.title")
        }
    }

    return (
        <nav className="fixed top-0 z-50 h-16 w-full border-b-2 pt-2 pb-2 dark:bg-black dark:border-b-0">
            <div className="mt-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <Link to={ROUTES.HOME} className="ml-2 flex">
                            <img alt="logo" src="/logo.png" width={48} height={48} className="h-10 w-10" />
                            <span className="ml-3 mt-1 self-center whitespace-nowrap font-mono text-xl dark:text-white">
                                {isAuthenticated && GetPageName()}
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <div className="mx-2 hidden md:block">
                                <Select onValueChange={(e) => {
                                    i18n.changeLanguage(e);
                                    localStorage.setItem(localStorageKey, e);
                                }}>
                                    <SelectTrigger className="w-[70px]">
                                        <SelectValue placeholder={localStorage.getItem(localStorageKey) || locales.en} />
                                    </SelectTrigger>
                                    <SelectContent className="w-[70px]" defaultValue={localStorage.getItem(localStorageKey) || locales.en} defaultChecked>
                                        {Object.keys(locales).map((locale) => (
                                            <SelectItem key={locale} value={locale}>{locale}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mt-1 mx-2">
                                <Switch checked={theme === DARK} onClick={() => setTheme(theme === DARK ? LIGHT : DARK)} />
                            </div>
                            <div className='mx-4'>
                                {
                                    isAuthenticated ?
                                        <Popover>
                                            <PopoverTrigger asChild className="cursor-pointer">
                                                <Avatar>
                                                    <AvatarImage className='h-10 w-10' src={user?.picture} />
                                                    <AvatarFallback className='h-10 w-10'>{`${user?.given_name?.charAt(0)}${user?.family_name?.charAt(0)}`}</AvatarFallback>
                                                </Avatar>
                                            </PopoverTrigger>
                                            <PopoverContent className="z-10 mt-2 w-80 rounded-lg border border-gray-300 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-black">
                                                <div className="grid gap-4">
                                                    <div className="space-y-2 text-center">
                                                        <p className="text-xs font-bold">{user?.email}</p>
                                                        <p className="text-xs">{t("navbar.managed_by")} {user?.hd}</p>
                                                        <div className='flex justify-center'>
                                                            <Avatar className='mt-3'>
                                                                <AvatarImage className='h-20 w-20' src={user?.picture} />
                                                                <AvatarFallback className='h-20 w-20 text-xl'>{`${user?.given_name?.charAt(0)}${user?.family_name?.charAt(0)}`}</AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                        <div className="pb-2 pt-1 text-xl font-light">{t("navbar.hi")}, {user?.given_name} {user?.family_name}!</div>
                                                        <Button onClick={logout}>
                                                            <LogOut className="mr-2 h-4 w-4" /> {t("navbar.logout")}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        :
                                        <GoogleLogin locale={localStorage.getItem(localStorageKey) || locales.en} onSuccess={login} />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
