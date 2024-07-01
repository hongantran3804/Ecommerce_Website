import { connectToDB } from "@utils/database";
import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const GET = async (request) => {
  try {
    await connectToDB();
    const productId = request.nextUrl.searchParams.get("productId");
    if (productId) {
      const product = await Product.findOne({ _id: productId }).populate(
        "brand"
      );
      if (product)
        return new Response(JSON.stringify({ product }), { status: 200 });
    }
  } catch (error) {
    console.log(error);
  }
  
  return new Response(null, { status: 422 });
}