import React from 'react';
import Link from 'next/link';

function Header() {
    return (
        <nav className="bg-gray-800 flex items-center justify-between p-4 h-20 text-white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
            </svg>
            <p className='text-white ml-4 font-semibold text-2xl mr-auto'>ToList </p>
            <ul className="flex gap-6 text-lg list-none">
                <li>
                    <Link href="/" className="p-2 hover:bg-gray-600 hover:rounded-md active:bg-purple-700 focus:ring focus:ring-green-600 focus:rounded-md focus:outline-none">All List</Link>
                </li>
                <li>
                    <Link href="/Padding" className="p-2 hover:bg-gray-600 hover:rounded-md active:bg-purple-700 focus:ring focus:ring-green-600 focus:rounded-md focus:outline-none">Padding</Link>
                </li>
                <li>
                    <Link href="/completed" className="p-2 hover:bg-gray-600 hover:rounded-md active:bg-purple-700 focus:ring focus:ring-green-600 focus:rounded-md focus:outline-none">Completed</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
