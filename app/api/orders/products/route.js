import { connectToDB } from "@utils/database";
import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const GET = async (request) => {
  const queryString = request.nextUrl.searchParams.get("queryString").toLowerCase();
  const userId = request.nextUrl.searchParams.get("userId");
  try {
    await connectToDB();
    if (userId) {
      let products = []
      const orders = await Order.find({ userId: userId });
      orders.forEach(order => {
        order.products.forEach(product => {
          if (product.brand.name.toLowerCase().includes(queryString) || product.prodDesc.toLowerCase().includes(queryString)) {
            products.push(product);
          }
        })
      })
      const order = { products: products };
      return new Response(JSON.stringify({ order }), { status: 200 });
    }
  } catch (err) {
    console.log(err);
  }
  return new Response(null, { status: 422 });
};
