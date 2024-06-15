import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt";
import User from "@models/User";
export const POST = async (request) => {
  const { email, password } = await request.json();
  try {
    await connectToDB();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "No user" }), {
        status: 404,
      });
    }
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return new Response(JSON.stringify(user), { status: 200 });
      else {
        console.log("");
        return new Response("wrong password", { status: 401 });
      }
    } catch (error) {
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 422,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 422,
    });
  }
  console.log(1);
};
