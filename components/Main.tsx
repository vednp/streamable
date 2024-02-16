"use client";
import React, { useEffect, useState } from "react";
import { dailyTrending, weeklyTrending } from "@utils/requests";
import Image from "next/image";
import GridComponent from "./GridComponent";

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

export default function Main() {
  const [daily, setDaily] = useState<Data>({ results: [] });
  const [weekly, setWeekly] = useState<Data>({ results: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyTrending = async () => {
      try {
        const json = await dailyTrending();
        setDaily(json);
      } catch (err) {
        console.error("Error fetching daily trending data:", err);
      }
    };

    const fetchWeeklyTrending = async () => {
      try {
        const json = await weeklyTrending();
        setWeekly(json);
      } catch (err) {
        console.error("Error fetching weekly trending data:", err);
      }
    };

    fetchDailyTrending();
    fetchWeeklyTrending();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [daily, weekly]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
