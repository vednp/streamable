"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { findById } from "@utils/requests";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bookmark, Play, PlayIcon } from "lucide-react";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type TvPageProps = {
  id: number;
  original_name: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: { id: number; name: string }[];
};

const MoviePage = () => {
  const params = useParams<any>();
  const qid = parseInt(params.id.toString());
  const [show, setShow] = useState<TvPageProps>({} as TvPageProps);
  const [showAlert, setShowAlert] = useState(false);
  const [showExistAlert, setShowExistAlert] = useState(false);

  useEffect(() => {
    findById(qid, "tv")
      .then((res: TvPageProps) => {
        setShow(res);
      })
      .catch((err: Error) => console.error("error:" + err));
  }, [qid]);

  const {
    id,
    original_name,
    overview,
    poster_path,
    vote_average,
    genres,
    number_of_seasons,
    number_of_episodes,
  } = show;

  const handleSaveLater = async () => {
    const response = await fetch(`/api/watchlater/${id}/tv`);
    const data = await response.json();
    const { success, exists } = data;
    if (success) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    if (exists) {
      setShowExistAlert(true);
      setTimeout(() => {
        setShowExistAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="movie-card mt-20 bg-gray-800 rounded-lg shadow-lg p-8 text-gray-300">
      <div className="lg:flex">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={original_name}
          className="max-w-xs rounded-lg mr-8"
        />
        <div>
          <h1 className=" text-2xl mt-2 md:text-4xl sm:font-bold font-bold playfair-display mb-4 text-teal-400">
            {original_name}
          </h1>
          <p className="mb-4 text-gray-300">{overview}</p>
          <div className="flex mb-4">
            <span className="mr-4 text-gray-200">
              Genre: {genres?.map((genre) => genre.name).join(", ")}
            </span>
          </div>
          <div className="flex mb-4">
            <span className="mr-4 text-gray-200 font-medium">
              Seasons: {number_of_seasons}
            </span>
            <span className="mr-4 text-gray-200 font-medium">
              Episodes: {number_of_episodes}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-gray-200 font-medium">Rating:</span>
            <span className="text-gray-300 p-2"> ⭐️ {vote_average}</span>
          </div>
          <div className=" text-xs sm:text-base flex flex-col md:flex-row md:space-x-4 space-y-3">
            <Link
              href={`/TvPlayer?id=${id}&name=${original_name}`}
              passHref
              rel="noopener noreferrer"
              className="ml-2 mt-3 px-4 pt-2 h-11 text-indigo-200 border-indigo-600 border-2 rounded-xl hover:border-indigo-900"
            >
              <div className="flex items-center space-x-2">
              <span><Play/></span> Watch Now
              </div>
            </Link>
            <Link
               href={`/TvPlayerTwo?id=${id}&name=${original_name}`}
              passHref
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-indigo-200 border-indigo-600 border-2 rounded-xl hover:border-indigo-900"
            >
              <div className="flex items-center space-x-2">
              <PlayIcon/> Watch Now{" "}
              <span className="ml-2 text-xs text-green-700  ">
                SERVER 2
              </span>
              </div>
            </Link>
            <button
              onClick={handleSaveLater}
              className="ml-2 px-4 py-2 text-indigo-200 border-indigo-600 border-2 rounded-xl flex items-center space-x-2 hover:border-indigo-900"
            >
              <Bookmark height={18} width={18} />
              <span>Watch Later</span>
            </button>
          </div>
        </div>
      </div>
      {showAlert && (
        <div className="absolute top-4 right-4">
          <Alert>
            <Terminal className="h-3 w-3" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              You have successfully added this movie to your watch later list.
            </AlertDescription>
          </Alert>
        </div>
      )}
      {showExistAlert && (
        <div className="absolute top-4 right-4">
          <Alert>
            <Terminal className="h-3 w-3" />
            <AlertTitle>Already Added</AlertTitle>
            <AlertDescription>
              You have already added this show to your watch later list.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default MoviePage;


