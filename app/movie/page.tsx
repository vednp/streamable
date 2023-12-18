"use client";
interface Data {
  media_type: String;
  results: Array<{
    id: number;
    title: String;
    poster_path: String;
    original_name: String;
    media_type: String;
    runtime: number;
  }>;

}
import React, { useEffect, useState } from "react";
import { topRated } from "@utils/requests";
import Card from "@components/Card";
import Image from "next/image";
import GridComponent from "@components/GridComponent";
export default function Main() {
  const [toprated, setTopRated] = useState<Data>({ results: [] });
 

  useEffect(() => {
    topRated()
      .then((json: Data) => {
        setTopRated(json);
        console.log(json);
        toprated.media_type = "movie";
      })
      .catch((err: Error) => console.error("error:" + err));

    // weeklyTrending()
    //   .then((json: Data) => {
    //     setWeekly(json);
    //   })
    //   .catch((err: Error) => console.error("error:" + err));
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
        <p className="text-2xl pb-7 pl-5 pt-12">Top Rated</p>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center`}>
        {toprated.results.map((result) => (
          <div key={result.id}>
            <Card
              poster_path={result.poster_path}
              media_type="movie"
              title={result.title || result.original_name}
              id={result.id}
            />
          </div>
        ))}
      </div>

      {/* <div className="flex">
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
      /> */}
    </div>
  );
}
