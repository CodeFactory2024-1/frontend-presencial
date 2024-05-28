'use client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import React, { useState } from 'react';
import Menu from './menu';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className='flex flex-col justify-center items-center h-auto w-full '>
            <nav className="flex flex-row w-full h-16 justify-between items-center bg-[#2196F3]">
                <MenuIcon className='w-12 h-12 ml-5 cursor-pointer text-white' onClick={handleToggle} />
                <Link className="text-center text-white text-2xl font-bold" href="/reservaB/formReservaB">
                    Reservar
                </Link>
                <AccountCircleIcon className='w-12 h-12 mr-5 cursor-pointer text-white' />
            </nav>
            <Menu isOpen={isOpen} handleToggle={handleToggle} />


        </div>
    );
}

export default Navbar;