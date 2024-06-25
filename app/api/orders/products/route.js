import { connectToDB } from "@utils/database";
import Order from "@models/Order";
import Address from "@models/Address";
import OrderCard from "@components/OrderCard";
export const GET = async (request) => {
  const queryString = request.nextUrl.searchParams.get("queryString").toLowerCase();
  const userId = request.nextUrl.searchParams.get("userId");
  console.log(queryString, userId)
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
