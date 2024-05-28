'use client'

import React, {useState} from 'react';

import { PrincipalText, PrincipalTextFucsia, PrincipalTextWhite, Subtitle} from '@components/atoms/text';

export interface Flight {
    id: number;
    flightNumber: string;
    basePrice: number;
    taxPercent: number;
    surcharge: number;
    flightType: string;
    scales: Scale[];
  }
interface Scale {
    airplaneModel: { id: string };
    originAirport: { id: string };
    destinationAirport: { id: string };
    departureDate: string;
    arrivalDate: string;
  }

interface FlightCardProps {
  flight: Flight;
  onEdit: (flightNumber: string) => void;
  onDelete: (flightNumber: string) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onEdit, onDelete }) => {
    const {
        flightNumber,
        basePrice,
        taxPercent,
        surcharge,
        flightType,
        scales,
    } = flight;

    const basePriceString = basePrice.toString();
    const taxPercentString = taxPercent.toString();
    const surchargeString = surcharge.toString();

    const [showScales, setShowScales] = useState(false);

      const toggleScales = () => {
      setShowScales(!showScales);
    };

    return (
        <div className="border rounded-md shadow-md p-4 mb-4">
            <p className="mb-2 text-fuchsia-800">Tipo de vuelo: {flightType}</p>
            <div className='flex flex-row items-start mx-4 space-x-2'>
                <Subtitle subtitle="Vuelo"></Subtitle>
                <Subtitle subtitle={flightNumber}></Subtitle>
            </div>

            <div>
          
          <ul>
            {scales.map((scale, index) => (
              <li key={index}> 
                <div className='flex flex-row items-start mx-4 space-x-2'>
            
                  <PrincipalTextFucsia text="Tipo de aeronave: "></PrincipalTextFucsia>
                  <PrincipalText text={scale.airplaneModel.id}></PrincipalText>

                </div>

                <div className='flex flex-row items-start mx-4 space-x-2'>
            
                  <PrincipalTextFucsia text="Origen: "></PrincipalTextFucsia>
                  <PrincipalText text={scale.originAirport.id}></PrincipalText>

                </div>

                <div className='flex flex-row items-start mx-4 space-x-2'>
            
                  <PrincipalTextFucsia text="Destino: "></PrincipalTextFucsia>
                  <PrincipalText text={scale.destinationAirport.id}></PrincipalText>

                </div>

                <div className='flex flex-row items-start mx-4 space-x-2'>
            
                  <PrincipalTextFucsia text="Hora salida: "></PrincipalTextFucsia>
                  <PrincipalText text={scale.departureDate}></PrincipalText>

                </div>

                <div className='flex flex-row items-start mx-4 space-x-2'>
            
                  <PrincipalTextFucsia text="Hora llegada: "></PrincipalTextFucsia>
                  <PrincipalText text={scale.arrivalDate}></PrincipalText>

                </div>
              </li>
            ))}
          </ul>
          
        </div>

          
          {showScales && (
          <div>
          <div className='flex flex-row items-start mx-4 space-x-2'>
            
            <PrincipalTextFucsia text="Precio: "></PrincipalTextFucsia>
            <PrincipalText text={basePriceString}></PrincipalText>

          </div>

          <div className='flex flex-row items-start mx-4 space-x-2'>
            
            <PrincipalTextFucsia text="Impuesto: "></PrincipalTextFucsia>
            <PrincipalText text={taxPercentString}></PrincipalText>

          </div>

          <div className='flex flex-row items-start mx-4 space-x-2'>
            
            <PrincipalTextFucsia text="Recargo: "></PrincipalTextFucsia>
            <PrincipalText text={surchargeString}></PrincipalText>

          </div>

          <div className='flex flex-row items-start mx-4 space-x-2'>
            
            <PrincipalTextFucsia text="Precio base: "></PrincipalTextFucsia>
            <PrincipalText text={basePriceString}></PrincipalText>

          </div>
          </div>
          )}
          {/* Mostramos el botón "Ver más" */}
     
      {/* Si showScales es verdadero, mostramos las escalas */}

      
          <div className="flex justify-end mt-4">
            <button id="btnVerMas" onClick={toggleScales} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
              <PrincipalTextWhite text="Ver más"></PrincipalTextWhite>
            </button>
            <button
              className="text-white px-4 py-2 rounded-md mr-2 bg-yellow-500"
              onClick={() => onEdit(flightNumber)}
            >
              <PrincipalTextWhite text="Editar"></PrincipalTextWhite>

            </button>
            <button
              id="btnEliminar"
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => onDelete(flightNumber)}
            >
              <PrincipalTextWhite text="Eliminar"></PrincipalTextWhite>

            </button>
          </div>
        </div>
      );
};

export default FlightCard;

