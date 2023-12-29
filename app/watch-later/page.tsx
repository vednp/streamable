"use client";
import { useState, useEffect } from "react";
import Card from "@components/Card";
import { X, Loader2 } from "lucide-react";

export default function Page() {
  const [watchlist, setWatchlist] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getsaved");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setWatchlist(data);

        console.log("watchlist:", watchlist);
        console.log("typeof watchlist:", typeof watchlist);
        setDataLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (movieId: any) => {
    try {
      const res = await fetch(`/api/deletesaved/${movieId}`);
      const updatedUser = await res.json();
      console.log(updatedUser);
      if (updatedUser) {
        setWatchlist(updatedUser.savedMovies);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-light p-9 mb-5 text-cyan-100 ">
        Watch List{" "}
      </h1>
      {dataLoaded ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 px-16 py-7 align-center`}
        >
          {watchlist &&
            watchlist
              .filter((result: { poster_path: string }) => result.poster_path)
              .map(
                (result: {
                  poster_path: string;
                  media_type: string;
                  title: string;
                  vote_average: number;
                  movieId: number;
                  original_name: string;
                }) => (
                  <div className="relative pt-3" key={result.movieId}>
                    <X
                      className="w-6 h-6 cursor-pointer text-cyan-100 absolute right-0 top-0"
                      onClick={() => handleDelete(result.movieId)}
                    />
                    <Card
                      poster_path={result.poster_path}
                      media_type={result.media_type}
                      title={result.title || result.original_name}
                      vote_average={result.vote_average}
                      id={result.movieId}
                    />
                  </div>
                )
              )}
        </div>
      ) : (
        <p>
          {" "}
          <Loader2 className="w-6 h-6 text-cyan-100 animate-spin ml-28" />
        </p>
      )}
    </div>
  );
}
