"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#0b0f19] h-16 shadow-lg shadow-indigo-600 flex items-center justify-between">
      <Link href="/">
        <div className="flex ml-6">
          <Image className="" src="/logo.png" height={40} width={40} alt="logo" />
          <p className="text-cyan-100 text-xl p-1 ml-1.5">Streamable</p>
        </div>
      </Link>
      <div className="text-cyan-100 flex space-x-5 mr-6 cursor-pointer md:hidden">
        <div onClick={toggleMenu}>
          <svg
            className="w-6 h-6 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
      </div>
      {/* Navigation Links */}
      <div className={`md:flex text-cyan-100 mr-16 md:space-x-5 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <p className="hover:text-indigo-400 ">
          <Link href="/">Home</Link>
        </p>
        <p className="hover:text-indigo-400">
          <Link href="/movie">Movies</Link>
        </p>
        <p className="hover:text-indigo-400">
          <Link href="/tv">TV</Link>
        </p>
      </div>
    </div>
  );
}

export default Nav;
