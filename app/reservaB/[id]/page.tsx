/* eslint-disable array-callback-return */
'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PlaceIcon from '@mui/icons-material/Place';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Navbar from 'components/navbar';
import { bookingType, loginData } from 'types';

const Page = ({ params }: { params: { id: string } }) => {
    const [bookings, setBookings] = useState<bookingType[]>([]);

    const getBookings = async () => {
        await fetch('https://codefact.udea.edu.co/modulo-09/v1/bookingPassenger/findBookingsByPassenger/' + params.id).then(async (bookingsResponse) => {
            if (!bookingsResponse.ok) {
                throw new Error('Hubo un problema con la solicitud fetch: ' + bookingsResponse.status);
            }
            setBookings(await bookingsResponse.json() as bookingType[]);
        });
    };

    useEffect(() => {
        getBookings();
    }, []);

    if (Array.isArray(bookings)) {
        bookings.map((bookingsItem, index) => {
            console.log(`bookings ${index}:`, bookingsItem);
        });
    } else {
        console.log('bookings is not an array');
    }

    //Manejo de la barra de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('estado');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };
    const filteredBookings = bookings.filter(bookings => {
        if (filter === 'estado') {
          return bookings.bookingStatus.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (filter === 'fecha') {
          return bookings.bookingDate.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    });

    const getBackgroundColor = (status: string) => {
        switch (status) {
            case "Payed":
                return "green";
            case "Pending":
                return "orange";
            case "Canceled":
                return "red";
            case "CheckIn":
                return "#2196F3";
            default:
                return "green";
        }
    };

    const handleCancelBooking = async (bookingId: number, flightId: number, bookingDate: string, totalPrice: number ) => {
        if (!window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
            return;
        }

        const loginResponse = await fetch('https://codefact.udea.edu.co/modulo-02/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: "user@default",
                password: "pass123"
            }),
        });
        if (!loginResponse.ok) {
            throw new Error('Login failed');
        }
        const loginData = await loginResponse.json() as loginData;
        const authToken = loginData.token;

        const response = await fetch('https://codefact.udea.edu.co/modulo-09/v1/booking/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                bookingId: bookingId,
                flightId: flightId,
                bookingDate: bookingDate,
                bookingStatus: "Canceled",
                totalPrice: totalPrice
            }),
        });

        if (!response.ok) {
            throw new Error('Hubo un problema con la solicitud fetch: ' + response.status);
        }
    
        // Refrescar las reservas después de cancelar una
        getBookings();
    };

    return (
        <div className="flex flex-col justify-start items-center w-screen h-screen max-h-screen">
            <Navbar />
            <div className='flex flex-col justify-center items-center w-screen h-full'>
                <section className='flex flex-col justify-center items-start w-3/4 h-auto border rounded-2xl p-10'>
                    <section className="flex flex-col justify-center items-start w-full h-auto mb-3">
                        <h1 className='font-bold text-2xl mb-3'>Tus reservas</h1>
                        <p className='text-xl'>Aquí podrá ver las reservas realizadas y sus estados.</p>
                    </section>
                    <section className='flex flex-row justify-start items-center w-full h-auto mb-3'>
                        <input type="text" placeholder={`Buscar por ${filter}`} value={searchTerm} onChange={handleSearch} className='flex flex-row h-12 w-80 px-3 border mr-6 rounded-xl' />
                        <select name="column" id="column" value={filter} onChange={handleFilterChange} className='flex flex-row h-12 w-52 px-3 border mr-6 rounded-xl'>
                            <option value="estado">Estado</option>
                            <option value="fecha">Fecha</option>
                        </select>
                        <FilterAltIcon className='w-10 h-10 cursor-pointer' />
                        <Link href="/reservaB/formReservaB" className='flex flex-row justify-center items-center w-52 h-12 bg-[#2196F3] font-bold text-xl text-white rounded-xl ml-80'>Reservar +</Link>
                    </section>
                    <section className="flex flex-col justify-center items-start w-full">
                        <table className='flex flex-col w-full h-auto justify-start items-center'>
                            <thead className='flex flex-row w-full justify-center items-center h-16'>
                                <tr className='flex flex-row w-full justify-between items-center h-full border-b'>
                                    {columns.map((c) => (
                                        <th key={c.field} className='flex flex-row justify-center items-center h-full' style={{ width: '12.5%' }}>
                                            {c.headerName}
                                            <ArrowDownwardIcon className='pl-1' />
                                        </th>
                                    ))}
                                    <th className='flex flex-row justify-center items-center h-full' style={{ width: '12.5%' }}>
                                        Modificar
                                    </th>
                                    <th className='flex flex-row justify-center items-center h-full' style={{ width: '12.5%' }}>
                                        Cancelar
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="flex flex-col w-full justify-between items-start overflow-auto max-h-52">
                                {filteredBookings.map((r) => {
                                    const bookingDate = new Date(r.bookingDate);
                                    return (
                                        <tr key={r.bookingId} className='flex flex-row w-full justify-between items-start p-4 border-b hover:bg-gray-200'>
                                            <td className='flex flex-row justify-center items-center h-full' style={{ width: '12.5%' }}>
                                                {r.bookingId}
                                            </td>
                                            <td className='flex flex-row justify-center items-center h-full' style={{ width: '12.5%' }}>
                                                {r.flightId}
                                            </td>
                                            <td className='flex flex-row justify-center items-center h-full' style={{ width: '12.5%' }}>
                                                {bookingDate.getFullYear()}-{String(bookingDate.getMonth() + 1).padStart(2, '0')}-{String(bookingDate.getDate()).padStart(2, '0')}
                                            </td>
                                            <td className='flex flex-row justify-center items-center h-full' style={{ width: '12.5%' }}>
                                                {r.totalPrice}
                                            </td>
                                            <td className='flex flex-row justify-center items-center h-2/3 rounded-3xl w-1/8 text-white font-semibold' style={{ width: '12.5%', height: '120%', backgroundColor: getBackgroundColor(r.bookingStatus) }}>
                                                {r.bookingStatus === "Payed" && <CheckCircleIcon className='mr-1' />}
                                                {r.bookingStatus === "Pending" && <AccessTimeIcon className='mr-1' />}
                                                {r.bookingStatus === "Canceled" && <CancelIcon className='mr-1' />}
                                                {r.bookingStatus === "CheckIn" && <PlaceIcon className='mr-1' />}
                                                {r.bookingStatus}
                                            </td>
                                            <td key={r.bookingId} className='flex flex-row justify-center items-center h-full' style={{ width: '12.5%' }}>
                                                <Link href={`/reservaB/reserva/${r.bookingId}`} className='flex flex-row justify-center items-center w-full h-full'>
                                                    <EditIcon />
                                                </Link>
                                            </td>
                                            <td className='flex flex-row justify-center items-center h-full' style={{ width: '12.5%' }}>
                                            <DeleteIcon className='cursor-pointer' onClick={() => handleCancelBooking(r.bookingId, r.flightId, r.bookingDate, r.totalPrice)} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </section>
                </section>
            </div>
        </div>
    )

}

export default Page;

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'vueloId', headerName: 'Vuelo ID' },
    { field: 'fecha', headerName: 'Fecha' },
    { field: 'precio', headerName: 'Precio' },
    { field: 'estado', headerName: 'Estado' }
];

// const rows = [
//     { id: 1, origen: 'BOG', destino: 'EDH', salida: '12/30/2024', pasajeros: 2, estado: 'Pagado', color: 'green' },
//     { id: 2, origen: 'MAD', destino: 'BOG', salida: '11/30/2024', pasajeros: 3, estado: 'Pendiente', color: 'blue' },
//     { id: 3, origen: 'JFK', destino: 'LHR', salida: '12/29/2024', pasajeros: 2, estado: 'Cancelado', color: 'red' },
//     { id: 4, origen: 'LAX', destino: 'LTN', salida: '11/25/2024', pasajeros: 5, estado: 'CheckIn', color: 'orange' },
//     { id: 5, origen: 'MED', destino: 'MIA', salida: '11/10/2024', pasajeros: 1, estado: 'Pendiente', color: 'blue' }
// ]