"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useKindeBrowserClient();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#0b0f19] h-16 shadow-lg shadow-indigo-600 flex items-center justify-between">
      <Link href="/">
        <div className="flex ml-6">
          <Image
            className=""
            src="/logo.png"
            height={40}
            width={40}
            alt="logo"
          />
          <p className="text-cyan-100 text-xl p-1 ml-1.5">Streamable</p>
        </div>
      </Link>
      <div className="text-cyan-100 flex space-x-5 mr-6 cursor-pointer md:hidden">
        <div onClick={toggleMenu}>
          {!user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
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
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <LoginLink>
                    <strong>Log In</strong>
                  </LoginLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <Link href="/">Home</Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movie">Movies</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link href="/tv">TV</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
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
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/watch-later">My Watchlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <Link href="/">Home</Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/movie">Movies</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link href="/tv">TV</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <LogoutLink>Log Out</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      {/* Navigation Links */}
      <div className={`items-center hidden text-cyan-100 mr-16 md:space-x-5 md:flex`}>
        <p className="hover:text-indigo-400 ">
          <Link href="/">Home</Link>
        </p>
        <p className="hover:text-indigo-400">
          <Link href="/movie">Movies</Link>
        </p>
        <p className="hover:text-indigo-400">
          <Link href="/tv">TV</Link>
        </p>

        {user ? (
          <>
            <p className="hover:bg-indigo-400 bg-blue-500 text-black px-3 py-1 rounded-lg ">
              <Link href="/watch-later">My Watchlist</Link>
            </p>
            <p className="hover:bg-indigo-400 border-2 border-blue-500 rounded-lg px-3 py-1 ">
              <LogoutLink>Log Out</LogoutLink>
            </p>
          </>
        ) : (
          <>
            <p className="hover:bg-indigo-400 border-2 border-blue-500 rounded-lg px-3 py-1 ">
              <LoginLink>Log In</LoginLink>
            </p>{" "}
            <p className="hover:bg-indigo-400 border-2 border-blue-500 rounded-lg px-3 py-1 ">
              <RegisterLink>Sign Up</RegisterLink>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
