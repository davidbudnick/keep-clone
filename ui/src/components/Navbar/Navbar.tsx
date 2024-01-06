import React from 'react'
import { Search } from '@/components/Search';
import { IoRefreshOutline, IoSettings } from 'react-icons/io5';
import { FaThList } from 'react-icons/fa'
import { NavIcon } from '@/components/Navbar/NavIcon';
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme, DARK, LIGHT } from "@/components/theme-provider"
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
    const { setTheme, theme } = useTheme()
    return (
        <nav className="fixed top-0 z-50 w-full border-b pt-1 pb-1 dark:bg-black bg-white">
            <div className="">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <Link to={ROUTES.HOME} className="ml-2 flex">
                            <img alt="logo" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" width={48} height={48} className="h-10 w-10" />
                            <span className="ml-3 mt-1 self-center whitespace-nowrap font-mono text-xl dark:text-white">Keep</span>
                        </Link>
                    </div>
                    <Search />
                    <div className="flex items-center">
                        <div className="ml-3 mt-1 flex items-center">
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
                            <div className='mr-1'>
                                <NavIcon icon={IoSettings} />
                            </div>
                            <div className='mr-10'>
                                <NavIcon icon={FaThList} />
                            </div>
                            <div>
                                <button type="button" className="mb-2 mr-4 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <Avatar>
                                        <AvatarImage src="https://s.gravatar.com/avatar/a84f08e26336cbbd8a316f4385effe6ffe61a1b77c1fee838e5d22b33ef2ac3e?s=80&r=g" />
                                        <AvatarFallback>DB</AvatarFallback>
                                    </Avatar>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;