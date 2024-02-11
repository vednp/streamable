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
          src={`https://embed.smashystream.com/playere.php?tmdb=${id}`}
          // src={`https://blackvid.space/embed?tmdb=${id}`}
          sandbox="allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-top-navigation allow-forms allow-popups"
          referrerPolicy="origin"
          allowFullScreen
          title="Embedded Content"
          width="100%"
          height="600"
        />
      </div>
    </div>
  );
}
