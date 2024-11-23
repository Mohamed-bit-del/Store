import React, { useState } from 'react';
import { BiChevronDown } from "react-icons/bi";

    const CustomDropdown = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[0]);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleOptionClick = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-auto">
            {/* Dropdown button */}
            <button
            onClick={toggleDropdown}
            className="flex items-center px-4 py-2 border-b bg-white border-gray-300"
            >
                <span className='text-[15px] font-medium text-gray-700'>{selectedValue} </span>
                <span className="ml-2"><BiChevronDown className='text-[25px] text-gray-300' /></span>
            </button>
            
            {/* Dropdown list */}
            {isOpen && (
            <ul className="absolute left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg w-full">
                {options.map((option, index) => (
                <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                    {option}
                </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
