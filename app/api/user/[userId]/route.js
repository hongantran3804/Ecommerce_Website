import { connectToDB } from "@utils/database";
import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const GET = async (request,{params}) => {
  const { userId } = params ;
  try {
    await connectToDB();
    const user = await User.findOne({ _id: userId });
    console.log(user)
    return new Response(JSON.stringify({user}),{status: 200});
  } catch (error) {
    console.log(error)
  }
  return new Response(null, { status: 422 });
}