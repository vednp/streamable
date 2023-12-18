import React from "react";
import Card from "./Card";
type Props = {
  classNames: String;
  time: {
    results: Array<{
      id: number;
      poster_path: string;
      media_type: string;
      title: string;
      original_name: string;
      vote_average: number;
    }>;
  };
};

export default function GridComponent({ time, classNames }: Props) {

  return (
    <div className={`${classNames}`}>
      {time.results
        .filter((result) => result.poster_path)
        .map((result) => (
          <div key={result.id}>
            <Card
              poster_path={result.poster_path}
              media_type={result.media_type}
              title={result.title || result.original_name}
              vote_average={result.vote_average}
              id={result.id}
            />
          </div>
        ))}
    </div>
  );
}
