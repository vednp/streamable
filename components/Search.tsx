"use client"
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Search: React.FC = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?name=${search}`);
  };
  return (
    <form autoComplete="off" onSubmit={handleSearch}>
      <div className=" p-24 px-44">
        <div className="flex place-content-center	">
          <Image
            src={"/tv-solid.svg"}
            height={24}
            width={24}
            alt="tv"
            className="mb-4 mr-2"
          />
          <p className="text-center font-medium text-2xl pb-5 text-cyan-100">
            {" "}
            Watch Something
          </p>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm focus:outline-none text-slate-100 border border-gray-500 rounded-lg bg-[#0b0f19] "
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          required
        />
      </div>
    </form>
  );
};

export default Search;
