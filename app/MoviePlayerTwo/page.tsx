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
          src={`https://vidsrc.to/embed/movie/${id}`}
          referrerPolicy="origin"
          allowFullScreen
          title="Embedded Content"
          width="100%"
          height="600">
          </iframe>
      </div>
    </div>
  );
}
