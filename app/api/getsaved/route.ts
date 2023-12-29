import connectDB from "@utils/database";
import User from "@utils/models/User";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  try {
    if (kindeUser == null) {
      return new Response(
        JSON.stringify({ error: "Authentication Required" }),
        { status: 200 }
      );
    }
    await connectDB();
    const user = await User.findOne({ email: kindeUser.email });
    if (!user) {
      // Handle the case where the user is not found in the database
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
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
