import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
type Props = {
    title:String,
    poster_path:String,
    media_type: String,
    vote_average:number,
    id:Number
}

export default function Card({poster_path, title, media_type, vote_average, id}: Props) {

  return (
    <div className="max-w-sm rounded relative block w-52 h-96  ">
      <Link href={`/${media_type}/${id}`}>
      <div className="relative w-full h-[37vh] mb-3">
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={"Poster Image"}
          height={250}
           width={200}
          className="rounded-xl hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out"
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-white text-xl mt-2 line-clamp-1 ">
            {title}
          </h2>
          <div className=" px-2 bg-[#161921] rounded-sm">
            <p className="text-white text-sm mt-4 font-bold capitalize">
              {media_type}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./episodes.svg"
              alt="episodes"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-base text-white font-bold">
              {}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./star.svg"
              alt="star"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-base font-bold text-[#FFAD49]">{vote_average?.toFixed(1)}</p>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
  }

