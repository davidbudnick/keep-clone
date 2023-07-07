import React from 'react'
import Image from 'next/image'
import { Search } from '../Search';
import { IoRefreshOutline, IoSettings } from 'react-icons/io5';
import { FaThList, FaMobile } from 'react-icons/fa'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import { MobileNav } from '../MobileNav';
import { NavIcon } from './NavIcon';
import { AiOutlineMenu } from 'react-icons/ai'


interface NavbarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setOpen, open }) => {
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                        </button>
                        <div className='pt-2'>
                            <button onClick={() => setOpen(!open)}>
                                <NavIcon icon={AiOutlineMenu} />
                            </button>
                        </div>
                        <a href="#" className="flex ml-2 md:mr-24">
                            <Image alt="logo" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" width={40} height={40} className="h-8 mr-3" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Keep Clone</span>
                        </a>
                        <Search />
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <div className="mr-1">
                                <NavIcon icon={IoRefreshOutline} />
                            </div>
                            <div className='mr-1'>
                                <NavIcon icon={IoSettings} />
                            </div>
                            <div className='mr-10'>
                                <NavIcon icon={FaThList} />
                            </div>
                            <div className='mr-10'>
                                <NavIcon icon={BsGrid3X3GapFill} />
                            </div>
                            <div>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 mb-2" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <Image alt="user photo" src="https://s.gravatar.com/avatar/a84f08e26336cbbd8a316f4385effe6ffe61a1b77c1fee838e5d22b33ef2ac3e?s=80&r=g" height={40} width={40} className="w-8 h-8 rounded-full" />
                                </button>
                            </div>
                            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                <MobileNav />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;