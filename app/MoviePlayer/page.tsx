"use client";
import React from "react";
import { useSearchParams } from "next/navigation";


export default function MoviePlayer() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const title = searchParams.get("title");

  return (
    <div>
      <div>
        <iframe
          src={`https://blackvid.space/embed?tmdb=${id}`}
          referrerPolicy="origin"
          allowFullScreen
          title="Embedded Content"
          width="60%"
          height="500"
        />
      </div>
    </div>
  );
}
