"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { findById } from "@utils/requests";
import MoviePlayer from "@app/MoviePlayer/page";
type MoviePageProps = {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date:String;
    runtime: number;
    genres: { id: number; name: string }[];
    production_companies: { name: string }[];
  };
};

const MoviePage: React.FC<MoviePageProps> = ({ params }) => {
  const [movie, setMovie] = useState({} as MoviePageProps["movie"]);

  useEffect(() => {
    findById(params.id, "movie")
      .then((json: MoviePageProps["movie"]) => {
        setMovie(json);
      })
      .catch((err: Error) => console.error("error:" + err));
  }, [params.id]);

  const {
    id,
    title,
    overview,
    release_date,
    poster_path,
    genres,
    production_companies,
    vote_average,
    runtime,
  } = movie;

  return (
    <div className="movie-card mt-20 bg-gray-800 rounded-lg shadow-lg p-8 text-gray-300">
      <div className="flex">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="max-w-xs rounded-lg mr-8"
        />
        <div>
          <h1 className="text-4xl font-bold playfair-display mb-4 text-teal-400">
            {title}
          </h1>
          <p>{release_date && <p>{release_date.slice(0,4)}</p>}</p>
          <p className="my-2">{runtime && <p>{runtime} min</p>}</p>
          <p className="my-2 text-gray-300">{overview}</p>
          <div className="flex mb-4">
            <span className="mr-4 text-gray-200">
              Genre: {genres?.map((genre) => genre.name).join(', ')}
            </span>
          </div>
          <span className="text-gray-200 mb-2">Rating:</span>
          <div className="flex items-center mb-4">
            <Image src="/star.svg" alt="star" width={18} height={18}></Image>
            <span className="text-gray-300 px-2">{vote_average}</span>
          </div>
          <div className="p-5 flex space-x-4">
            <Link
              href={`/MoviePlayer?id=${id}`}
              passHref
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-indigo-200 border-indigo-600 border-2 rounded-xl hover:border-indigo-900"
            >
              ▶️ Watch Now
            </Link>
            <Link
              href={`/MoviePlayerTwo?id=${id}&name=${title}`}
              passHref
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-indigo-200 border-indigo-600 border-2 rounded-xl hover:border-indigo-900"
            >
              ▶️ Watch Now <span className="ml-2 text-xs text-green-700 mb-4 ">SERVER 2</span>
            </Link>
            <Link
              href={"/player"}
              className="ml-2 px-4 py-2 text-indigo-200 border-indigo-600 border-2 rounded-xl hover:border-indigo-900"
            >
              🏷️ Watch Later
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
