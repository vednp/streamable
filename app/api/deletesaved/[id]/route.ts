import connectDB from "@utils/database";
import User from "@models/User";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = async (request: Request, { params }: { params: { id: number } }) => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const movieId = params.id
  if (kindeUser == null) {
    redirect("/login");
  }
  try {
    await connectDB();
      const updatedUser = await User.findOneAndUpdate(
        { email: kindeUser.email },
        { $pull: { savedMovies: { movieId } } },
        { new: true }
      );
    return new Response(JSON.stringify(updatedUser), { status: 200 })

  } catch (error) {
    console.log(error);
  }
};
