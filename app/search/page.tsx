"use client";
interface Data {
  results: Array<{
    id: number;
    title: string;
    poster_path: string;
    original_name: string;
    media_type: string;
    vote_average: number;
  }>;
}
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { multiSearch } from "@utils/requests";
import Card from "@components/Card";
import Image from "next/image";
import GridComponent from "@components/GridComponent";
export default function Search() {
  const [data, setData] = useState<Data>({ results: [] });
  const searchParams = useSearchParams();
  const name = String(searchParams.get("name"));
  useEffect(() => {
    multiSearch(name)
      .then((json: Data) => {
        setData(json);
      })
      .catch((err: Error) => console.error("error:" + err));
  }, []);

  return (
    <div className="text-cyan-100 px-9 ">
      <p className="text-2xl pb-7 pl-5 pt-12">Search Results for {name}</p>

      <GridComponent
        classNames={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center"
        }
        time={data}
      />
    </div>
  );
}
