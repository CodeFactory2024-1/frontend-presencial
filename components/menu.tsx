import { Collapse, Drawer, InputBase, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookIcon from '@mui/icons-material/Book';
import CheckIcon from '@mui/icons-material/Check';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FlightIcon from '@mui/icons-material/Flight';
import Link from 'next/link';
import React, { MouseEventHandler, useState } from 'react';

interface MenuProps {
    isOpen: boolean;
    handleToggle: MouseEventHandler;
}

function Menu({ isOpen, handleToggle }: MenuProps) {
    const [openAccount, setOpenAccount] = useState(false);
    const [openPrices, setOpenPrices] = useState(false);

    const handleAccountToggle = () => {
        setOpenAccount(!openAccount);
    };

    const handlePricesToggle = () => {
        setOpenPrices(!openPrices);
    };

    return (
        <Drawer anchor='left' open={isOpen} onClose={handleToggle}>
            <div className='w-80'>
                <h1 className='text-center text-2xl font-bold my-5'>Singapur Airlines</h1>
                <InputBase className='w-full p-2 border rounded mb-5' placeholder='Filtrar...' />
                <List>
                    <ListItem button onClick={handleAccountToggle}>
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary='Mi cuenta' />
                        {openAccount ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openAccount} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding className='bg-gray-100 pl-10'>
                            <ListItem button >
                                <ListItemText className='text-xs pl-14' secondary='Informacion' />
                            </ListItem>
                            <ListItem button >
                                <ListItemText className='text-xs pl-14' secondary='Metodo de pago' />
                            </ListItem>
                            <ListItem button >
                                <ListItemText className='text-xs pl-14' secondary='Preferencias' />
                            </ListItem>
                            <ListItem button >
                                <ListItemText className='text-xs pl-14' secondary='Configuracion' />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={handlePricesToggle}>
                        <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                        <ListItemText primary='Precios' />
                        {openPrices ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openPrices} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding className='bg-gray-100 pl-10'>
                            <ListItem button >
                                <ListItemText className='text-xs pl-14' secondary='Equipaje' />
                            </ListItem>
                            <ListItem button >
                                <ListItemText className='text-xs pl-14' secondary='Asientos' />
                            </ListItem>
                            <ListItem button>
                                <ListItemText className='text-xs pl-14' secondary='Vuelos' />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon><FlightIcon /></ListItemIcon>
                        <ListItemText className='text-2xl font-bold' primary='Vuelos' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><BookIcon /></ListItemIcon>
                        <Link href="/reservaB/1">
                            <ListItemText className='text-2xl font-bold' primary='Reservas' />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><CheckIcon /></ListItemIcon>
                        <ListItemText className='text-2xl font-bold' primary='Checkin' />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}

export default Menu;