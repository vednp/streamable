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
import { dailyTrending, weeklyTrending } from "@utils/requests";
import Card from "./Card";
import Image from "next/image";
import GridComponent from "./GridComponent";
export default function Main() {
  const [daily, setDaily] = useState<Data>({ results: [] });
  const [weekly, setWeekly] = useState<Data>({ results: [] });

  useEffect(() => {
    dailyTrending()
      .then((json: Data) => {
        setDaily(json);
      })
      .catch((err: Error) => console.error("error:" + err));

    weeklyTrending()
      .then((json: Data) => {
        setWeekly(json);
      })
      .catch((err: Error) => console.error("error:" + err));
  }, []);

  return (
    <div className="text-cyan-100 px-9 ">
      <div className="flex">
        <Image
          src={"/arrow-trend-up-solid.svg"}
          height={24}
          width={24}
          alt="tv"
          className="mt-4 ml-6"
        />
        <p className="text-2xl pb-7 pl-5 pt-12">Trending Today</p>
      </div>

      <GridComponent
        classNames={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center"
        }
        time={daily}
      />

      <div className="flex">
        <Image
          src={"/arrow-trend-up-solid.svg"}
          height={24}
          width={24}
          alt="tv"
          className="mt-28 ml-6"
        />
        <p className="text-2xl pb-7 pl-5 pt-36">Trending This Week</p>
      </div>
      <GridComponent
        classNames={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center	"
        }
        time={weekly}
      />
    </div>
  );
}
