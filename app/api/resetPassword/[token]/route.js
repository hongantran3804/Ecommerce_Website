import jwt from "jsonwebtoken";
import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const POST = async (request, { params }) => {
  const { token } = params;
  try {
    const {
      email
    } = jwt.verify(token, process.env.JWT_SECRET);
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
