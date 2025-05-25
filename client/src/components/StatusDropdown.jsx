import React from 'react'
import { useState } from 'react';
import { Clock, CheckCircle } from "lucide-react";

const StatusDropdown = ({ status, setStatus }) => {
    const [isOpen, setIsOpen ] = useState(false);

    //Define your status options with text and icons
    const options = [
        {value: "pending", label: "Pending", icon: <Clock className='h-4 w-4 text-amber-500' />},
        { value: "in-progress", label: "In Progress", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        { value: "resolved", label: "Resolved", icon: <CheckCircle className="h-4 w-4 text-green-500" /> },
    ];

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Toggle dropdown visibility
    const handleSelect = (value) => {
        setStatus(value);
        setIsOpen(false);
    };

  return (
    <div className='relative w-full'>
        <div 
            className='flex items-center justify-between px-3 border rounded-md cursor-pointer text-sm'
            onClick={toggleDropdown}
        >
          {options.find((opt) => opt.value === status)?.icon}
        <span className='ml-2'>
            {options.find((opt) => opt.value === status)?.label || "Select Status"}
        </span>  
        </div>

        {isOpen && (
            <div className='absolute left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-10'>
                {options.map((option) => (
                    <div 
                        key={option.value}
                        onClick={()=> handleSelect(option.value)}
                        className='flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer'
                    >
                        {option.icon}
                        <span>{option.label}</span>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default StatusDropdown