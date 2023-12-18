import React from "react";
import Image from "next/image";
import Link from "next/link";
function Nav() {
  return (
    <div className="bg-[#0b0f19] h-16 shadow-lg shadow-indigo-600 flex items-center justify-between ">
      <Link href={'/'}>
      <div className="flex ml-6">
        <Image
          className=""
          src={"/logo.png"}
          height={40}
          width={40}
          alt="logo"
        />
        <p className=" text-cyan-100 text-xl p-1 ml-1.5 ">Streamable</p>
      </div>
        </Link>
      <div className="text-cyan-100 flex space-x-5 mr-16 cursor-pointer ">
        <p className="hover:text-indigo-400"><Link href={'/'}>Home</Link></p>
        <p className="hover:text-indigo-400"><Link href={'/movie'}>Movies</Link></p>
        <p className="hover:text-indigo-400"><Link href={'/tv'}>TV</Link></p>
      </div>
    </div>
  );
}

export default Nav;
