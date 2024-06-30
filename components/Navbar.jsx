"use client";

import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <img src="/smit.png" alt="Left Image" className="w-20 h-16 rounded-full ml-4" />
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
                        <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                        <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                        <div className="w-6 h-0.5 bg-gray-600"></div>
                    </button>
                    {isOpen && (
                        <div className="absolute right-10 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Settings 1
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Settings 2
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Settings 3
                            </a>
                        </div>
                    )}
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Logout
                </button>
            </div>
        </div>
    );
}
