"use client";
import React from "react";
import { useSearchParams } from "next/navigation";


export default function MoviePlayer() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const title = searchParams.get("title");

  var frames = document.getElementsByTagName('iframe');
for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    frame.setAttribute("sandbox", "allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-top-navigation allow-forms");
}

  return (
    <div>
      <div>
        <iframe
          src={`https://blackvid.space/embed?tmdb=${id}`}
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
