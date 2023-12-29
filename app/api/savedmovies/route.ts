import connectDB from "@utils/database";
import User from "@utils/models/User";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = async (request: Request) => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (kindeUser == null) {
    redirect("/login");
  }
  try {
    await connectDB();
    const user = await User.findOne({ email: kindeUser.email });
    const watchlist = user.savedMovies;
    return new Response(JSON.stringify(watchlist), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
