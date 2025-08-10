import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const GET = async (request, { params }) => {
  const { orderId } = params;
  const userId = request.nextUrl.searchParams.get("userId");
  try {
    if (userId && orderId) {
      const order = await Order.findOne({ userId: userId, _id: orderId })
        .populate("address")
        .populate("progress");
      if (order) {
        return new Response(JSON.stringify({ order }), { status: 200 });
      }
    }
  } catch (err) {
    console.log(err);
  }
  return new Response(null, { status: 422 });
};
