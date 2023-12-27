import connectDB from "@utils/database";
import dbuser from "@models/User";
import { findById } from "@utils/requests";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = async (
  request: Request,
  { params }: { params: { id: number; type: string } }
) => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const mid = params.id;

  const media_type = params.type;
  let movieObject: any;
  const movie = await findById(mid, media_type);
  if (media_type === "movie") {
    const { title, poster_path, vote_average } = movie;
    const movieobject = {
      media_type: media_type,
      poster_path: poster_path,
      movieId: mid,
      title: title,
      vote_average: vote_average,
    };
    movieObject = movieobject
  }
  if (media_type === "tv") {
    const { original_name, poster_path, vote_average } = movie;
    const movieobject = {
      media_type: media_type,
      poster_path: poster_path,
      movieId: mid,
      title: original_name,
      vote_average: vote_average,
    };
    movieObject = movieobject
  }

  try {
    await connectDB();
    const user = await dbuser.findOne({ email: kindeUser?.email });
    if (!user) {
      const newUser = await dbuser.create({
        email: kindeUser?.email,
        username: kindeUser?.given_name,
        savedMovies: [movieObject],
      });
      console.log("New user created:");
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    const isMovieAlreadySaved = user.savedMovies.some(
      (savedMovie: any) => savedMovie.title === movieObject.title
    );
    if (!isMovieAlreadySaved) {
      await dbuser.findOneAndUpdate(
        { email: kindeUser?.email },
        { $push: { savedMovies: movieObject } }
      );
      console.log("MovieObject added to existing user");
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      console.log(" Movie already exists in user");
      return new Response(JSON.stringify({ exists: true }), { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
