import React from "react"
import { Search } from "@/components/Search";
import { IoRefreshOutline } from "react-icons/io5";
import { NavIcon } from "@/components/Navbar/NavIcon";
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
import { PAGES } from "@/constants/pages";

const Navbar: React.FC = () => {
    const { setTheme, theme } = useTheme()
    const location = useLocation();



    const auth = useAuth();

    const GetPageName = () => {
        switch (location.pathname) {
        case ROUTES.HOME:
            return PAGES.HOME
        case ROUTES.ARCHIVED:
            return PAGES.ARCHIVED
        case ROUTES.TRASH:
            return PAGES.TRASH
        }
    }

    return (
        <nav className="fixed top-0 z-50 w-full border-b bg-white pb-1 pt-1 dark:bg-black">
            <div className="">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <Link to={ROUTES.HOME} className="ml-2 flex">
                            <img alt="logo" src="/logo.png" width={48} height={48} className="h-10 w-10" />
                            <span className="ml-3 mt-1 self-center whitespace-nowrap font-mono text-xl dark:text-white">
                                {GetPageName()}
                            </span>
                        </Link>
                    </div>
                    <Search />
                    <div className="flex items-center">
                        <div className="ml-1 mt-1 flex items-center">
                            <div className="mr-1">
                                <Switch checked={
                                    theme === DARK
                                } onClick={() => {
                                    setTheme(theme === DARK ? LIGHT : DARK)
                                }}
                                />
                            </div>
                            <div className="mr-1">
                                <NavIcon onClick={() => {
                                    window.location.reload()
                                }} icon={IoRefreshOutline} />
                            </div>
                            <div className='mb-1 mr-4'>
                                {
                                    auth.isAuthenticated ?
                                        <Popover>
                                            <PopoverTrigger asChild className="cursor-pointer">
                                                <Avatar>
                                                    <AvatarImage className='h-10 w-10' src={auth.user?.picture} />
                                                    <AvatarFallback className='h-10 w-10'>{`${auth.user?.given_name?.charAt(0)}${auth.user?.family_name?.charAt(0)}`}</AvatarFallback>
                                                </Avatar>
                                            </PopoverTrigger>
                                            <PopoverContent className="mt-1 w-80">
                                                <div className="grid gap-4">
                                                    <div className="space-y-2 text-center">
                                                        <p className="text-xs font-bold">{auth.user?.email}</p>
                                                        <p className="text-xs">Managed by {auth.user?.hd}</p>
                                                        <div className='flex justify-center'>
                                                            <Avatar className='mt-3'>
                                                                <AvatarImage className='h-20 w-20' src={auth.user?.picture} />
                                                                <AvatarFallback className='h-20 w-20 text-xl'>{`${auth.user?.given_name?.charAt(0)}${auth.user?.family_name?.charAt(0)}`}</AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                        <div className="pb-2 pt-1 text-xl font-light">Hi, {auth.user?.given_name} {auth.user?.family_name}!</div>
                                                        <Button onClick={auth.logout}>
                                                            <LogOut className="mr-2 h-4 w-4" /> Logout
                                                        </Button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        :
                                        <GoogleLogin onSuccess={auth.login} />
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
