'use client'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import React, { useEffect, useState } from 'react';
import FormButton from 'components/formButton';
import FormFly from 'components/formFly';
import FormInput from 'components/formInputEdit';
import FormSelect from 'components/formSelect';
import Navbar from 'components/navbar';
import ReservaIdButton from 'components/reservaIdButton';
import ReservaIdInfo from 'components/ReservaIdInfo';
import ReservaStatus from 'components/ReservaStatus';
import useFormData from 'hooks/useFormData';
import { bookingType, passengerType, personType } from 'types';
import { set } from 'zod';


const Page = ({ params }: { params: { id: string } }) => {
    console.log(params.id);
    
    const [idNumber, setIdNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [genre, setGenre] = useState('');
    const [birthDate, setBirthday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const genreOptions = [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Femenino' },
        { value: 'O', label: 'Otro' },
    ];

    const documentOptions = [
        { value: '1', label: 'Cedula' },
        { value: '2', label: 'Pasaporte' },
        { value: '3', label: 'Tarjeta de identidad' },
        { value: '4', label: 'Cedula extranjera' },
    ];

    const [booking, setBooking] = useState<bookingType>();
    const [passengers, setPassengers] = useState<passengerType[]>([]);
    const [persons, setPersons] = useState<personType[]>([]);

    const getBooking = async () => {
        await fetch('https://codefact.udea.edu.co/modulo-09/v1/booking/' + params.id).then(async (bookingResponse) => {
            if (!bookingResponse.ok) {
                throw new Error('Hubo un problema con la solicitud fetch: ' + bookingResponse.status);
            }
            setBooking(await bookingResponse.json() as bookingType);
        });
    };

    const getPassengers = async () => {
        await fetch('https://codefact.udea.edu.co/modulo-09/v1/bookingPassenger/findPassengersByBooking/' + params.id).then(async (passengersResponse) => {
            if (!passengersResponse.ok) {
                throw new Error('Hubo un problema con la solicitud fetch: ' + passengersResponse.status);
            }
            setPassengers(await passengersResponse.json() as passengerType[]);
        });
    };

    const getPersons = async () => {
        const personsPromises = passengers.map(async (passenger) => {
            const personResponse = await fetch('https://codefact.udea.edu.co/modulo-09/v1/person/' + passenger.personId);
            if (!personResponse.ok) {
                throw new Error('Hubo un problema con la solicitud fetch: ' + personResponse.status);
            }
            return personResponse.json() as Promise<personType>;
        });

        const newPersons = await Promise.all(personsPromises);
        setPersons(newPersons);
    };

    useEffect(() => {
        getBooking();
        getPassengers();
    }, []);

    useEffect(() => {
        getPersons();
    }, [passengers]);

    useEffect(() => {
        if (persons.length > 0) {
            setIdNumber(persons[0]?.idNumber ?? '');
            setFirstName(persons[0]?.firstName ?? '');
            setLastName(persons[0]?.lastName ?? '');
            setGenre(persons[0]?.genre ?? '');
            setBirthday(persons[0]?.birthDate ?? '');
            setPhoneNumber(persons[0]?.phoneNumber ?? '');
            setCountry(persons[0]?.country ?? '');
            setProvince(persons[0]?.province ?? '');
            setCity(persons[0]?.city ?? '');
            setAddress(persons[0]?.address ?? '');
            setEmail(persons[0]?.email ?? '');
        }
    }, [persons]);

    if (Array.isArray(passengers)) {
        passengers.map((passengerItem, index) => {
            console.log(`passenger ${index}:`, passengerItem);
        });
    } else {
        console.log('passengers is not an array');
    }

    if (Array.isArray(persons)) {
        persons.map((personsItem, index) => {
            console.log(`persons ${index}:`, personsItem);
        });
    } else {
        console.log('persons is not an array');
    }

    const [viewInfo, setViewInfo] = useState(false);
    const handleViewInfo = () => {
        setViewInfo(!viewInfo);
    }
    const [viewEmerg, setViewEmerg] = useState(false);
    const handleViewEmerg = () => {
        setViewEmerg(!viewEmerg);
    }

    const { form, formData, updateFormData } = useFormData({});

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("Form: ", formData);
        console.log("Buscar por id number: " + formData.idNumber);

        let personId;
        let person: personType;

        await fetch('https://codefact.udea.edu.co/modulo-09/v1/person/documentId/' + formData.idNumber).then(async (personResponse) => {
            if (!personResponse.ok) {
                throw new Error('Hubo un problema con la solicitud fetch: ' + personResponse.status);
            }

            person = await personResponse.json() as personType;

            if (person) {
                personId = person.personId;
                console.log("Person Id: " + personId);
                console.log("Person: ", person);
            }else{
                console.log("No existe la persona");
            }
        });

        //Se crea la persona si no existe, se actualiza si ya existe
        const personResponse = await fetch('https://codefact.udea.edu.co/modulo-09/v1/person/person', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': 'token',
            },
            body: JSON.stringify({
                personId: personId,
                identificationType: {
                identificationTypeId: 1,
                identificationTypeName: "CC"
                },
                idNumber: formData.idNumber,
                firstName: formData.firstName,
                lastName: formData.lastName,
                genre: formData.genre,
                birthDate: formData.birthDate,
                phoneNumber: formData.phone,
                country: formData.country,
                province: formData.province,
                city: formData.city,
                address: formData.address,
                email: formData.email,
            }),
        });
        if (!personResponse.ok) {
            throw new Error('Person creation failed');
        }
    }

    return (


        <div className="flex flex-col items-center justify-start w-screen h-auto">
            <Navbar />
            <section className='flex flex-row justify-between items-center h-auto w-10/12 p-3 mt-20 '>
                <ReservaIdButton
                    className="flex flex-row justify-center items-center w-auto h-12 bg-[#2196F3] rounded-full shadow-lg px-5 text-white font-semibold"
                    icon={<KeyboardArrowLeftIcon className="text-white" />}
                    link={'/reservaB/reserva/' + params.id} 
                >
                    Volver
                </ReservaIdButton>
                <ReservaIdButton
                    className="flex flex-row justify-center items-center w-auto h-12 bg-[#ffac38] rounded-xl shadow-lg px-5 text-white font-semibold"
                    icon={<WorkRoundedIcon className="text-white ml-2" />}
                    link='/ModuloEquipaje'
                >
                    Equipaje
                </ReservaIdButton>
                <ReservaIdButton className="flex flex-row justify-center items-center w-auto h-12 bg-[#2196F3] rounded-xl shadow-lg px-5 text-white font-semibold"
                    icon={<CreditCardRoundedIcon className="text-white ml-2" />}
                    link='/ModuloPago '
                >
                    Pagar
                </ReservaIdButton>
                <ReservaIdButton
                    className="flex flex-row justify-center items-center w-auto h-12 bg-[#248d37] rounded-xl shadow-lg px-5 text-white font-semibold"
                    icon={<PeopleRoundedIcon className="text-white ml-2" />}
                    link='/ModuloAsientos'
                >
                    Asientos
                </ReservaIdButton>

                <ReservaStatus status={booking?.bookingStatus ?? 'Pending'} />
            </section>
            <FormFly />
            <form
                id='formReserva'
                ref={form}
                onChange={updateFormData}
                onSubmit={handleSubmit}
                className='w-full h-auto flex flex-col justify-center items-center'
                autoComplete='off'
            >
                    <section className='flex flex-col w-10/12 h-auto items-center justify-center p-3 border rounded-xl mt-10'>
                        <div className='flex flex-row justify-between items-center w-full h-16 px-5'>
                            <label className='flex flex-row w-1/3 justify-start text-xl font-semibold '>Información</label>
                            <label className='flex flex-row w-1/3 justify-start text-base font-thin '>Pasajero</label>
                            {viewInfo ? <KeyboardArrowUpIcon className='rounded-full hover:bg-gray-200 w-10 h-10 cursor-pointer' onClick={handleViewInfo} onChange={handleViewInfo} /> : <KeyboardArrowDownIcon className='rounded-full hover:bg-gray-200 w-10 h-10 cursor-pointer' onClick={handleViewInfo} onChange={handleViewInfo} />}
                        </div>
                        {viewInfo && <h1 className='flex flex-row justify-start items-center h-16 text-xl font-bold w-full px-5'>Información básica</h1>}
                        {viewInfo && 
                            <ul className='flex flex-row justify-between items-center w-full h-auto flex-wrap px-5'>
                                <FormInput label={'Nombres'} type={'text'} identity={'firstName'} name={'firstName'} value={firstName} />
                                <FormInput label={'Apellidos'} type={'text'} identity={'lastName'} name={'lastName'} value={lastName} />
                                <FormInput label={'Fecha de nacimiento'} type={'date'} identity={'birthDate'} name={'birthDate'} value={birthDate} />
                                <FormInput label={'Telefono'} type={'text'} identity={'phone'} name={'phone'} value={phoneNumber} />
                                <FormInput label={'Email'} type={'email'} identity={'email'} name={'email'} value={email} />
                                <FormSelect label={'Género'} identity={'genre'} name={'genre'} options={genreOptions} />
                                <FormSelect label={'Tipo de documento'} identity={'idType'} name={'idType'} options={documentOptions} />
                                <FormInput label={'Documento'} type={'text'} identity={'idNumber'} name={'idNumber'} value={idNumber}/>
                                <FormInput label={'Pais'} type={'text'} identity={'country'} name={'country'} value={country} />
                                <FormInput label={'Departamento'} type={'text'} identity={'province'} name={'province'} value={province} />
                                <FormInput label={'Ciudad'} type={'text'} identity={'city'} name={'city'} value={city} />
                                <FormInput label={'Dirección'} type={'text'} identity={'address'} name={'address'} value={address} />
                            </ul>
                        }
                    </section>
                <section className='flex flex-col w-10/12 h-auto items-center justify-center p-3 border rounded-xl mt-10 mb-5'>
                    <div className='flex flex-row justify-between items-center w-full h-16 px-5'>
                        <label className='flex flex-row w-1/3 justify-start text-xl font-semibold '>Información de emergencia</label>
                        <label className='flex flex-row w-1/3 justify-start text-base font-thin '>Pasajero principal</label>
                        {viewEmerg ? <KeyboardArrowUpIcon className='rounded-full hover:bg-gray-200 w-10 h-10 cursor-pointer' onClick={handleViewEmerg} onChange={handleViewEmerg} /> : <KeyboardArrowDownIcon className='rounded-full hover:bg-gray-200 w-10 h-10 cursor-pointer' onClick={handleViewEmerg} onChange={handleViewEmerg} />}
                    </div>
                    {viewEmerg && <h1 className='flex flex-row justify-start items-center h-16 text-xl font-bold w-full px-5'>Contacto de emergencia</h1>}
                    {viewEmerg && <p className='flex flex-row justify-start items-center h-10 w-full px-5'>Este se usará si ocurre alguna emergencia con el pasajero principal.</p>}
                    {viewEmerg && <ul className='flex flex-row justify-between items-center w-full h-auto flex-wrap px-5'>
                        <li className='flex flex-col justify-start items-start h-auto text-gray-400' style={{ width: "49%" }}>
                            <label className='flex flex-row w-full my-2 justify-start items-center h-4'> Nombres </label>
                            <input type="text" className='flex flex-col w-full h-16 rounded-xl border p-3 text-gray-400' value="John Alfredo" readOnly />
                        </li>
                        <li className='flex flex-col justify-start items-start h-auto text-gray-400' style={{ width: "49%" }}>
                            <label className='flex flex-row w-full my-2 justify-start items-center h-4'> Apellidos </label>
                            <input type="text" className='flex flex-col w-full h-16 rounded-xl border p-3 text-gray-400' value="Valderrama Piñuela" readOnly />
                        </li>
                        <li className='flex flex-col justify-start items-start h-auto text-gray-400' style={{ width: "49%" }}>
                            <label className='flex flex-row w-full my-2 justify-start items-center h-4'> Telefono </label>
                            <input type="text" className='flex flex-col w-full h-16 rounded-xl border p-3 text-gray-400' value="(+57) 777 777 77 77" readOnly />
                        </li>
                        <li className='flex flex-row justify-start items-center h-20 ' style={{ width: "49%" }}>
                            <p className='w-auto text-gray-400 mt-7'>
                                Para todos los pasajeros
                            </p>
                            <input
                                // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
                                className="mt-7 ml-5 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-gray-200 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-gray-400 after:shadow-switch-2 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-white/25 dark:after:bg-surface-dark dark:checked:bg-primary dark:checked:after:bg-primary"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault02"
                                checked readOnly />
                        </li>
                    </ul>}
                    {viewEmerg && <h1 className='flex flex-row justify-start items-center h-16 text-xl font-bold w-full px-5'>Perdida de maletas</h1>}
                    {viewEmerg && <p className='flex flex-row justify-start items-center h-10 w-full px-5'>Se llevará el equipaje a la dirección que ingrese en caso de perdida.</p>}
                    {viewEmerg && <ul className='flex flex-row justify-between items-center w-full h-auto flex-wrap px-5'>
                        <li className='flex flex-col justify-start items-start h-auto' style={{ width: "49%" }}>
                            <label className='flex flex-row w-full my-2 justify-start items-center h-4 text-gray-400'> Dirección </label>
                            <input type="text" className='flex flex-col w-full h-16 rounded-xl border p-3 text-gray-400 ' value="Cll 44 #44-44" readOnly />
                        </li>
                    </ul>}
                </section>
                <FormButton type='submit' text='Guardar' color='#2196F3' icon={<SaveAltIcon className='text-white ml-2' />} />
            </form>
        </div >
    );
};

export default Page;