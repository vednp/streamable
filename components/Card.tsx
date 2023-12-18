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

// !!!!!!! OLD DESIGN !!!!!!
//   return (
// <section>
//     <Link href={`/${media_type}/${id}`}>
//     <div className='bg-[#0b0f19] p-3 rounded-lg flex flex-col items-center shadow-lg shadow-indigo-500/40 hover:overflow-hidden hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out' style={{ width: '240px', height: '380px' }}>
//         <Image
//         src={`https://image.tmdb.org/t/p/w500${poster_path}`}
//         height={250}
//         width={200}
//         alt='Image'
//         className='mb-2'
//         />
//         <p className='text-center text-sm'>{title}</p>
//     </div>
//     </Link>
//     </section>
//   )
// }


  return (
    <div className="max-w-sm rounded relative block w-full my-1 " style={{ width: '200px', height: '380px' }}>
      <Link href={`/${media_type}/${id}`}>
      <div className="relative w-full h-[37vh] mb-7">
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={"Poster Image"}
          height={250}
           width={200}
          className="rounded-xl hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-white text-xl line-clamp-1 ">
            {title}
          </h2>
          <div className=" px-2 bg-[#161921] rounded-sm">
            <p className="text-white text-sm font-bold capitalize">
              {media_type}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
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

