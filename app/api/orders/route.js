import { connectToDB } from "@utils/database";
import Orders from "@models/Orders";
import dayjs from "dayjs";
import ShoppingCart from "@models/ShoppingCart";
export const POST = async (request) => {
  const { products, userId, orderPlacedDate, deliveredDate, total } =
    await request.json();
  console.log(deliveredDate);
  const now = dayjs();
  try {
    await connectToDB();
    const newOrder = new Orders({
      userId: userId,
      products: products,
      orderPlacedDate: new Date(orderPlacedDate),
      deliveredDate: new Date(deliveredDate),
      total,
      delivered: false,
    });
    await newOrder.save();
    await ShoppingCart.deleteMany({});
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};

export const GET = async (request) => {
  try {
    await connectToDB();
    const now = dayjs();
    await Orders.updateMany({ deliveredDate: { $lt: now.toDate() } }, {
      $set: {
        delivered: true
      }
    });
    const orders = await Orders.find({});
    console.log(orders)
    return new Response(JSON.stringify({ orders }), { status: 200 });
  } catch (err) {
    console.log(err);
  }

  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};

export const PUT = async (request) => {
  const orderId = request.nextUrl.searchParams.get("orderId");
  console.log(orderId)
  try {
    await connectToDB();
    await Orders.findByIdAndDelete(orderId);
     return new Response(JSON.stringify({message:"successfully"}), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", {status: 500})
  }
};
