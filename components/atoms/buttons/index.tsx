'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { PrincipalTextWhite } from '@components/atoms/text';

interface BtnRegistrarProps {
    toggleFlightForm: () => void;
}

interface BtnConsultarProps {
    toggleSearchPage: () => void;

}

export function BtnGuardar() {
  return (
    <button className='bg-primary text-white py-2 w-[450px] h-24 rounded-full font-bold flex items-center justify-center hover:bg-secondary'>
        <PrincipalTextWhite text="Registrar información de vuelo"></PrincipalTextWhite>
       
        <div className='w-12 h-12 pl-2 flex justify-center mt-8'>
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
        </div>
    </button>
  );
}

export function BtnRegistrar ({ toggleFlightForm }: BtnRegistrarProps) {
    
    return (
        <>
        <button className='bg-primary text-white py-2 px-4 rounded-none rounded-l-full w-[200px] h-12 font-bold flex items-center justify-center hover:bg-secondary shadow-2xl' onClick={toggleFlightForm}>
            <div id="btnRegistrar" className='w-12 h-12 pl-2 flex justify-center mt-8'>
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
            </div>
            <PrincipalTextWhite text="Registrar"></PrincipalTextWhite>
           
            
        </button>
    
        </>

      );

}

export function BtnConsultar ({toggleSearchPage}: BtnConsultarProps) {
    return (
        <>
        <button className='bg-primary text-white py-2 px-4 rounded-none rounded-l-full w-[200px] h-12 font-bold flex items-center justify-center hover:bg-secondary  shadow-2xl'onClick={toggleSearchPage}>
            <div className='w-12 h-12 pl-2 flex justify-center mt-8'>
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
            </div>
            <PrincipalTextWhite text="Consultar"></PrincipalTextWhite>
           
            
        </button>

        
        </>
      );

}
