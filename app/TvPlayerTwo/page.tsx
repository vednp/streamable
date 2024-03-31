
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { findById, EpisodeInfo } from "@utils/requests";

interface Season {
  id: number;
  season_number: number;
  episode_count: number;
}

interface Show {
  id: number;
  seasons: Season[];
}

interface EpisodeInfoProp {
  overview: string;
  name: string;
  episode_number: number;
  season_number: number;
}

export default function TvPlayer() {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  const title = searchParams.get("title");

  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [episodeInfo, setEpisodeInfo] = useState<EpisodeInfoProp>(
    {} as EpisodeInfoProp
  );
  const [show, setShow] = useState<Show>({} as Show);

  useEffect(() => {
    findById(id, "tv")
      .then((json) => {
        setShow(json);
      })
      .catch((err) => console.error("error:" + err));

    EpisodeInfo(id, season, episode)
      .then((json) => {
        console.log(json);
        setEpisodeInfo(json);
      })
      .catch((err) => console.error("error:" + err));
  }, [id, season, episode]);

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(Number(event.target.value));
    setEpisode(1);
  };

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEpisode(Number(event.target.value));
  };

  let selectedSeason =
    show.seasons && show.seasons.find((s) => s.season_number === season);

  const { overview, name, episode_number, season_number } = episodeInfo;

  return (
    <div>
      <div className="mt-12 md:ml-9 flex flex-col md:flex-row ">
        <iframe
          src={`https://vidsrc.to/embed/tv/${id}/${season}/${episode}`}
          allowFullScreen
          title="Embedded Content"
          width="100%"
          height="550"
        ></iframe>
        <div className="m-9 flex-col md:w-2/5">
          <p className="text-sm mb-4 font-light text-cyan-100">
            <span className="mr-4">SEASON {season_number}</span>EPISODE{" "}
            {episode_number}
          </p>
          <p className="text-3xl mb-4 font-bold text-cyan-100">{name}</p>
          <p className="text-cyan-100">{overview}</p>
        </div> 
      </div>
      <div className=" flex flex-col md:flex-row ml-16 md:ml-0 justify-center ">
        <div className="flex flex-col space-y-2 p-5">
          <label htmlFor="season" className="text-sm font-medium text-cyan-100">
            Season:
          </label>
          <select
            id="season"
            value={season}
            onChange={handleSeasonChange}
            className="border-0 cursor-pointer drop-shadow-md text-cyan-100 hover:bg-sky-600 w-72 duration-300 p-2 bg-gray-700"
          >
            {show.seasons &&
              show.seasons.map((seasonData, index) => (
                <option key={seasonData.id} value={index + 1}>
                  {`Season ${index + 1}`}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2 p-5">
          <label
            htmlFor="episode"
            className="text-sm font-medium text-cyan-100"
          >
            Episode:
          </label>
          <select
            id="episode"
            value={episode}
            onChange={handleEpisodeChange}
            className="border-0 cursor-pointer drop-shadow-md text-cyan-100 hover:bg-sky-600 w-72 duration-300 p-2 bg-gray-700"
          >
            {selectedSeason &&
              [...Array(selectedSeason.episode_count)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {`Episode ${index + 1}`}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}
