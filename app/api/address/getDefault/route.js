import { connectToDB } from "@utils/database";
import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const GET = async (request) => {
  const userId = request.nextUrl.searchParams.get("userId");
  if (userId) {
    try {
      await connectToDB();
      let defaultAddress = await Address.findOne({
        userId: userId,
        default: true,
      });
      if (defaultAddress) {
        defaultAddress._id = defaultAddress._id.toString();
        return new Response(JSON.stringify({ defaultAddress }), {
          status: 200,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return new Response(null, { status: 404 });
};
