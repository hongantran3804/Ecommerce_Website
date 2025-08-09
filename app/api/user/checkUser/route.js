import User from "@models/User";
import bcrypt from "bcrypt";
export const GET = async (request) => {
  const email = request.nextUrl.searchParams.get("email");
  const password = request.nextUrl.searchParams.get("password");

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return new Response(null, { status: 200 });
      }
    }
  } catch (error) {
    console.log(error);
  }
  return new Response(null, { status: 422 });
};
