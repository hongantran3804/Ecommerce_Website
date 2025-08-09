import jwt from "jsonwebtoken";
import User from "@models/User";
import { redirect } from "next/navigation";
export const GET = async (request, { params }) => {
  const { token } = params;
  let page = "/signup";
  try {
    
    const {
      email
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
        await User.findOneAndDelete({ email: email });
      }
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({message: "Something went wrong"}), {status: 422});
  }
  redirect(page);
};
