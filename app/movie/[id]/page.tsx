"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { findById } from "@utils/requests";
import { useParams } from "next/navigation";
import { Bookmark, Play, PlayIcon } from "lucide-react";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
type MoviePageProps = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: String;
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { name: string }[];
};

const MoviePage = () => {
  const params = useParams();
  const { user } = useKindeBrowserClient();
  const qid = Number(params.id);
  const [movie, setMovie] = useState<MoviePageProps>({} as MoviePageProps);
  const [showAlert, setShowAlert] = useState(false);
  const [showExistAlert, setShowExistAlert] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    findById(qid, "movie")
      .then((res: MoviePageProps) => {
        setMovie(res);
      })
      .catch((err: Error) => console.error("error:" + err));
  }, [qid]);

  const {
    id,
    title,
    overview,
    release_date,
    poster_path,
    genres,
    vote_average,
    runtime,
  } = movie;

  const handleSaveLater = async () => {
    if (!user) {
      setUserLoggedIn(true);
      setTimeout(() => {
        setUserLoggedIn(false);
      }, 3000);
    }  
    const response = await fetch(`/api/watchlater/${id}/movie`);
    console.log(response);
    const data = await response.json();
    const { success, exists } = data;
    if (success) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else if (exists) {
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
          alt={title}
          className=" w-44 sm:w-80 mb-5 rounded-lg mr-8 "
        />
        <div className="">
          <h1 className="md:text-4xl sm:font-bold font-bold playfair-display mb-4 text-teal-400">
            {title}
          </h1>
          <p>{release_date && <p>{release_date.slice(0, 4)}</p>}</p>
          <p className="my-2">{runtime && <p>{runtime} min</p>}</p>
          <p className="my-2 text-gray-300">{overview}</p>
          <div className="flex mb-4">
            <span className="mr-4 text-gray-200">
              Genre: {genres?.map((genre) => genre.name).join(", ")}
            </span>
          </div>
          <span className="text-gray-200 mb-2">Rating:</span>
          <div className="flex items-center mb-4">
            <span className="text-gray-300 "> ⭐️ {vote_average}</span>
          </div>
          <div className=" text-xs sm:text-base flex flex-col md:flex-row md:space-x-4 space-y-3">
            <Link
              href={`/MoviePlayerTwo?id=${id}&name=${title}`}
              passHref
              rel="noopener noreferrer"
              className="ml-2 mt-3 px-4 pt-2 h-11 text-indigo-200 border-indigo-600 border-2 rounded-xl hover:border-indigo-900"
            >
              <div className="flex items-center space-x-2">
                <span>
                  <Play />
                </span>{" "}
                Watch Now
              </div>
            </Link>
            <Link
              href={`/MoviePlayer?id=${id}&name=${title}`}
              passHref
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-indigo-200 border-indigo-600 border-2 rounded-xl hover:border-indigo-900"
            >
              <div className="flex items-center space-x-2">
                <PlayIcon /> Watch Now{" "}
                <span className="ml-2 text-xs text-green-700  ">SERVER 2</span>
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
      {userLoggedIn && (
        <div className="absolute top-4 right-4">
          <Alert>
            <Terminal className="h-3 w-3" />
            <AlertTitle>Log In to add movie to watch later</AlertTitle>
            <AlertDescription>
              Please log in to add this movie to your watch later list.
            </AlertDescription>
          </Alert>
        </div>
      )}
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
              You have already added this movie to your watch later list.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
