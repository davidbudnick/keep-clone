import React from 'react'
import { Search } from '@/components/Search';
import { IoLogOutOutline, IoRefreshOutline, IoSettings } from 'react-icons/io5';
import { NavIcon } from '@/components/Navbar/NavIcon';
import { Switch } from "@/components/ui/switch"
import { useTheme, DARK, LIGHT } from "@/components/theme-provider"
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';
import { GoogleLogin, CredentialResponse, googleLogout } from '@react-oauth/google';
import { AUTH } from '@/constants/auth';

const Navbar: React.FC = () => {
    const { setTheme, theme } = useTheme()

    const responseMessage = (response: CredentialResponse) => {
        localStorage.setItem(AUTH.GOOGLE_CLIENT, response.clientId || "");
        localStorage.setItem(AUTH.GOOGLE_CREDENTIAL, response.credential || "");
    };

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
                                <NavIcon onClick={
                                    () => {
                                        localStorage.removeItem(AUTH.GOOGLE_CLIENT);
                                        localStorage.removeItem(AUTH.GOOGLE_CREDENTIAL);
                                        googleLogout();
                                        window.location.reload()
                                    }

                                } icon={IoLogOutOutline} />
                            </div>
                            <div className='mr-4 mb-1'>
                                <GoogleLogin onSuccess={responseMessage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;