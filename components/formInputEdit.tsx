'use client'

import React from 'react';



interface FormInputProps {
    label: string;
    identity: string;
    type: string;
    name: string;
    value: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, identity, name, value }) => {
    const [inputValue, setInputValue] = React.useState(value);
    return (
        <li className='flex flex-col justify-start items-start h-auto' style={{ width: "49%" }}>
            <label className='flex flex-row w-full my-2 justify-start items-center h-4'>{label}</label>
            <input
                aria-label={name}
                className='flex flex-col w-full h-16 rounded-xl border p-3'
                type={type}
                required
                name={identity}
                id={name}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
        </li>
    );
};

export default FormInput;