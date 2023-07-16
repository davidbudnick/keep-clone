import React from 'react'
import Image from 'next/image'
import { Search } from 'src/components/Search';
import { IoRefreshOutline, IoSettings } from 'react-icons/io5';
import { FaThList } from 'react-icons/fa'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import { MobileNav } from 'src/components/Navbar/MobileNav';
import { NavIcon } from 'src/components/Navbar/NavIcon';
import { AiOutlineMenu } from 'react-icons/ai'
import Link from 'next/link';
import { ROUTES } from 'src/constants/routes';

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden">
                            <span className="sr-only">Open sidebar</span>
                        </button>
                        <div className='ml-2 mt-2'>
                            <button>
                                <NavIcon icon={AiOutlineMenu} />
                            </button>
                        </div>
                        <Link href={ROUTES.NOTES} className="ml-2 flex md:mr-24">
                            <Image alt="logo" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" width={48} height={48} className="h-10 w-10" />
                            <span className="ml-3 mt-1 self-center whitespace-nowrap font-mono text-xl dark:text-white">Keep</span>
                        </Link>
                        <Search />
                    </div>
                    <div className="flex items-center">
                        <div className="ml-3 mt-1 flex items-center">
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
                                <button type="button" className="mb-2 mr-4 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <Image alt="user photo" src="https://s.gravatar.com/avatar/a84f08e26336cbbd8a316f4385effe6ffe61a1b77c1fee838e5d22b33ef2ac3e?s=80&r=g" height={40} width={40} className="h-8 w-8 rounded-full" />
                                </button>
                            </div>
                            <div className="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700" id="dropdown-user">
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