import connectDB from "@utils/database";
import User from "@utils/models/User";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = async () => {
  
  try {
    await connectDB();
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();
    const user = await User.findOne({ email: kindeUser.email });
    const watchlist = user.savedMovies;
    return new Response(JSON.stringify(watchlist), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error:
          "Internal Server Error in savedmovies api route failed to get saved movies",
      }),
      { status: 500 }
    );
  }
};
