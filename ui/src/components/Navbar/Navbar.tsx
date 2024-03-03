import React, { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { DARK, LIGHT } from "@/constants/theme";
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
import { locales } from "@/locales/i18n";
import i18n from "i18next";
import { UpdateTheme } from "@/lib/theme";
import { DEFUALT_MOBILE_WIDTH } from "@/constants/mobile";
import { useMediaQuery } from "react-responsive";
import { MdNote } from "react-icons/md";


const Navbar: React.FC = () => {
    const location = useLocation();
    const auth = useAuth();
    const { t } = useTranslation();
    const [theme, setTheme] = useState<string>(auth.user?.settings.theme || DARK);
    const [locale, setLocale] = useState<string>(auth.user?.settings.locale || "");
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: DEFUALT_MOBILE_WIDTH });

    useEffect(() => {
        setTheme(auth.user?.settings.theme || DARK);
        setLocale(auth.user?.settings.locale || "");
    }, [auth.user?.settings.locale, auth.user?.settings.theme]);



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
                            <MdNote size={40} className="text-gray-500" />
                            <span className="ml-3 mt-1 self-center whitespace-nowrap font-mono text-xl dark:text-white">
                                {GetPageName()}
                            </span>
                        </Link>
                    </div>
                    {auth.user &&
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="mx-2">
                                    {auth.isAuthenticated && !auth.loading &&
                                        <>
                                            {isSelectOpen && isMobile && (
                                                <div
                                                    style={{
                                                        position: "fixed",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                        zIndex: 50,
                                                    }}
                                                    onClick={() => setIsSelectOpen(false)}
                                                />
                                            )}
                                            <Select
                                                onValueChange={(e) => {
                                                    auth.update({
                                                        settings: {
                                                            locale: e,
                                                            theme: theme,
                                                        },
                                                    });
                                                    i18n.changeLanguage(
                                                        e || locales.en
                                                    );
                                                }}
                                                onOpenChange={setIsSelectOpen}
                                            >
                                                <SelectTrigger className="w-[70px]">
                                                    <SelectValue placeholder={locale} />
                                                </SelectTrigger>
                                                <SelectContent className="w-[70px]" defaultValue={locale} defaultChecked>
                                                    {Object.keys(locales).map((locale) => (
                                                        <SelectItem key={locale} value={locale}>{locale}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    }
                                </div>
                                <div className="mt-1 mx-2">
                                    {auth.isAuthenticated && !auth.loading &&
                                        <Switch
                                            disabled={!auth.isAuthenticated}
                                            key={theme}
                                            checked={
                                                theme === DARK
                                            }
                                            onClick={() => {
                                                const newTheme = theme === DARK ? LIGHT : DARK;
                                                setTheme(newTheme);
                                                auth.update({
                                                    settings: {
                                                        locale: locale,
                                                        theme: newTheme,
                                                    },
                                                });
                                                UpdateTheme(newTheme);
                                            }}
                                        />
                                    }

                                </div>
                                <div className='mx-4'>
                                    {
                                        auth.isAuthenticated && !auth.loading ?
                                            <Popover>
                                                <PopoverTrigger asChild className="cursor-pointer">
                                                    <Avatar>
                                                        <AvatarImage className='h-10 w-10' src={auth.user?.picture} />
                                                        <AvatarFallback className='h-10 w-10'>{`${auth.user?.givenName?.charAt(0) || ""}${auth.user?.familyName?.charAt(0) || ""}`}</AvatarFallback>
                                                    </Avatar>
                                                </PopoverTrigger>
                                                <PopoverContent className="z-10 mt-2 w-80 rounded-lg border border-gray-300 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-black">
                                                    <div className="grid gap-4">
                                                        <div className="space-y-2 text-center">
                                                            <p className="text-xs font-bold">{auth.user?.email}</p>
                                                            {auth.user?.hd &&
                                                                <p className="text-xs">{t("navbar.managed_by")} {auth.user?.hd}</p>
                                                            }
                                                            <div className='flex justify-center'>
                                                                <Avatar className='mt-3'>
                                                                    <AvatarImage className='h-20 w-20' src={auth.user?.picture} />
                                                                    <AvatarFallback className='h-20 w-20 text-xl'>{`${auth.user?.givenName?.charAt(0)}${auth.user?.familyName?.charAt(0)}`}</AvatarFallback>
                                                                </Avatar>
                                                            </div>
                                                            <div className="pb-2 pt-1 text-xl font-light">{t("navbar.hi")}, {auth.user?.givenName} {auth.user?.familyName}!</div>
                                                            <Button onClick={auth.logout}>
                                                                <LogOut className="mr-2 h-4 w-4" /> {t("navbar.logout")}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            :
                                            <GoogleLogin locale={locale || locales.en} onSuccess={auth.login} />
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
