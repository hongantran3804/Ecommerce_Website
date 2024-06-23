import jwt from "jsonwebtoken";
import User from "@models/User";
import { redirect } from "next/navigation";
import { connectToDB } from "@utils/database";
export const GET = async (request, { params }) => {
  console.log(1)
  const env = require("@env/env");
  const { token } = params;
  let page = "/signup";
  try {
    const {
      email: { email },
    } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.confirmed) {
        page = "/login";
      } else if (email) {
        user.confirmed = true;
        await user.save();
        page = "/login";
      } else {
        User.findOneAndDelete({ email: email });
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({message: "Something went wrong"}), {status: 422});
  }
  redirect(page);
};
