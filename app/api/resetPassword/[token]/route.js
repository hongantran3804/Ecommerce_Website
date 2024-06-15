import jwt from "jsonwebtoken";
import { env } from "@utils/utils";
export const POST = async (request, { params }) => {
  const { token } = params;
  console.log(token);
  try {
    const {
      email
    } = jwt.verify(token, env["JWT_SECRET"]);
    if (email) {
      return new Response(JSON.stringify({ message: "Ok" }), {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
  }

  return new Response(JSON.stringify({ message: "Token expires" }), {
    status: 301,
  });
};
