'use client';
import React, { FormEvent, useState } from 'react';
import { BtnGuardar } from '@components/atoms/buttons';
import { PrincipalText, Subtitle } from '@components/atoms/text';

export default function FlightForm(){

    interface FlightData {
        id: number;
        flightNumber: string;
        basePrice: number;
        taxPercent: number;
        surcharge: number;
        flightType: string;
        scales: Scale[];
    }
    
    interface Scale {
        airplaneModel: {
            id: string;
        };
        originAirport: {
            id: string;
        };
        destinationAirport: {
            id: string;
        };
        departureDate: string;
        arrivalDate: string;
    }

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [flightNumber, setFlightNumber] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Obtener los valores de origen, destino, fecha de salida y fecha de llegada
        const origen = (event.target as HTMLFormElement).origen.value;
        const destino = (event.target as HTMLFormElement).destino.value;
        const fechaSalida = new Date((event.target as HTMLFormElement).fecha_salida.value);
        const fechaLlegada = new Date((event.target as HTMLFormElement).fecha_llegada.value);
        const precio = parseFloat((event.target as HTMLFormElement).precio.value);
        const impuestos = parseFloat((event.target as HTMLFormElement).impuestos.value);
        const sobretasa = parseFloat((event.target as HTMLFormElement).sobretasa.value);

        

        // Validación 1: La ciudad de destino no debe ser la misma que la de origen
        if (origen === destino) {
            setErrorMessage('La ciudad de destino no puede ser la misma que la de origen.');
            return; // Detener el envío del formulario
        }

        // Validación 2: La fecha de llegada no debe ser antes que la fecha de salida
        if (fechaLlegada < fechaSalida) {
            setErrorMessage('La fecha de llegada no puede ser antes que la fecha de salida.');
            return; // Detener el envío del formulario
        }

        

        // Construir la fecha y hora de salida en formato YYYY-MM-DD hh:mm:ss
        const departureDateTime = `${fechaSalida.toISOString().slice(0, 10)} ${(event.target as HTMLFormElement).hora_salida.value}:00`;

        // Construir la fecha y hora de llegada en formato YYYY-MM-DD hh:mm:ss
        const arrivalDateTime = `${fechaLlegada.toISOString().slice(0, 10)} ${(event.target as HTMLFormElement).hora_llegada.value}:00`;

        // Construir el objeto JSON con los campos correctos
        const flightData: any = {
            basePrice: precio,
            taxPercent: impuestos,
            surcharge: sobretasa,

            scales: [{
                airplaneModel: { id: (event.target as HTMLFormElement).tipo_aeronave2.value },
                originAirport: { id: origen },
                destinationAirport: { id: destino },
                departureDate: departureDateTime,
                arrivalDate: arrivalDateTime
            }]
        };

        try {
            const response = await fetch('https://codefact.udea.edu.co/modulo-18/api/v1/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(flightData)
            });
    
            if (response.ok) {

                const responseData = await response.json() as FlightData; // Especificar el tipo de responseData
                const flightNumber = responseData.flightNumber; // Acceder directamente al flightNumber del objeto responseData
                setFlightNumber(flightNumber); // Actualizar el número de vuelo con el flightNumber generado
                setShowSuccessModal(true);; // Mostrar la ventana emergente de éxito
        
                
                 // Mostrar la ventana emergente de éxito
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (error) {
            alert('Error en el servidor'); // Mostrar una ventana emergente de error
        }

        

        
        };

        const closeModal = () => {
            setErrorMessage(null);

        

    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    

    return (
        <div className="max-w-6xl mx-auto h-full">
            <div className='mt-8 mb-8'>
                <Subtitle subtitle="Ingresar información básica del vuelo" ></Subtitle>
            </div>

            <form className="grid grid-cols-3 gap-12" onSubmit={handleSubmit}>
                <div></div>
                <div className="mb-2 col-span-1">
                <PrincipalText text="Tipo de aeronave "></PrincipalText>
                <div className='flex justify-center'>
                    <div className='pr-2'>
                    <select id="tipo_aeronave1" name="tipo_aeronave1" className="form-select border text-xl py-2 px-3 pr-4 border-gray-800 rounded-md">
                        <option value="Airbus">Airbus</option>
                        <option value="Boeing">Boeing</option>
                    </select>
                    </div>
                    <div className='pl-2'>
                    <select id="tipo_aeronave2" name="tipo_aeronave2" className="form-select border text-xl py-2 px-3 border-gray-800 rounded-md">
                        <option value="A320-300">A320-300</option>
                        <option value="A520-100">A520-100</option>
                    </select>
                    </div>
                    </div>
                </div>
                <div></div>
            
                <div className="mb-2 col-span-1">
                    <PrincipalText text="Precio"></PrincipalText>
                    <input id="precio" name="precio" type="number" min="0" className="form-input w-full text-xl py-2 px-3 border border-gray-800 rounded-md text-center" required />
                </div>
                <div className="mb-2 col-span-1">
                    <PrincipalText text="Porcentaje de impuestos"></PrincipalText>
                    <input id="impuestos" name="impuestos" type="number" min="0" max="100" step="0.01" className="form-input w-full text-xl py-2 px-3 border border-gray-800 rounded-md text-center" required />
                </div>
                <div className="mb-2 col-span-1">
                    <PrincipalText text="Porcentaje de sobretasa"></PrincipalText>
                    <input id="sobretasa" name="sobretasa" type="number" min="0" max="100" step="0.01" className="form-input w-full text-xl py-2 px-3 border border-gray-800 rounded-md text-center" required />
                </div>
                <div className="mb-2 col-span-1">
                    <PrincipalText text="Origen"></PrincipalText>
                    <select id="origen" name="origen" className="form-select w-full text-xl py-2 px-3 border border-gray-800 rounded-md">
                        <option value="MDE">MDE</option>
                        <option value="BOG">BOG</option>
                    </select>
                </div>
                <div className="mb-2 col-span-1">
                    <PrincipalText text="Fecha de salida"></PrincipalText>
                    <input id="fecha_salida" name="fecha_salida" type="date" className="form-input w-full text-xl py-2 px-3 border border-gray-800 rounded-md" required />
                </div>
                <div className="mb-2 col-span-1">
                    <PrincipalText text="Hora de salida"></PrincipalText>
                    <input id="hora_salida" name="hora_salida" type="time" className="form-input w-full text-xl py-2 px-3 border border-gray-800 rounded-md" required />
                </div>
                <div className="mb-2 col-span-1">
                    <PrincipalText text="Destino"></PrincipalText>
                    <select id="destino" name="destino" className="form-select w-full text-xl py-2 px-3 border border-gray-800 rounded-md">
                        <option value="MDE">MDE</option>
                        <option value="BOG">BOG</option>
                    </select>
                </div>
                <div className="mb-2 col-span-1">
                    <PrincipalText text="Fecha de llegada"></PrincipalText>
                    <input id="fecha_llegada" name="fecha_llegada" type="date" className="form-input w-full text-xl py-2 px-3 border border-gray-800 rounded-md" required />
                </div>
                <div className="mb-2 col-span-1">
                    <PrincipalText text="Hora llegada"></PrincipalText>
                    <input id="hora_llegada" name="hora_llegada" type="time" className="form-input w-full text-xl py-2 px-3 border border-gray-800 rounded-md" required />
                </div>
                <div className="col-span-3 flex justify-center mb-4">
                    <BtnGuardar/>
                </div>
                {errorMessage && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-md shadow-lg">
                            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                            <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Cerrar</button>
                        </div>
                    </div>
                )}
                {showSuccessModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-md shadow-lg">
                            <p className="text-green-500 text-center mb-4">El vuelo ha sido guardado exitosamente. Número de vuelo: {flightNumber}</p>
                            <button onClick={closeSuccessModal} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Cerrar</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}



