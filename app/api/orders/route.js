import { connectToDB } from "@utils/database";
import Order from "@models/Order";
import dayjs from "dayjs";
import ShoppingCart from "@models/ShoppingCart";
import Product from "@models/Product";
import Address from "@models/Address";
export const POST = async (request) => {
  const { products, userId, orderPlacedDate, deliveredDate, total, addressId } =
    await request.json();
  console.log(addressId);
  const now = dayjs();
  if (addressId && userId) {
    console.log(addressId)
    try {
      await connectToDB();
      const newOrder = new Order({
        userId: userId,
        address: addressId,
        products: products,
        orderPlacedDate: new Date(orderPlacedDate),
        deliveredDate: new Date(deliveredDate),
        total,
        delivered: false,
        address: addressId,
      });
      await newOrder.save();
      await ShoppingCart.deleteMany({ userId: userId });
      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};

export const GET = async (request) => {
  const userId = request.nextUrl.searchParams.get("userId");
  if (userId) {
    try {
      await connectToDB();
      const now = dayjs();
      await Order.updateMany(
        { deliveredDate: { $lt: now.toDate() } },
        {
          $set: {
            delivered: true,
          },
        }
      );
      let orders = await Order.find({ userId: userId }).populate("address");
      if (orders.length) {
        orders = orders.map((order) => {
          return order;
        });
        return new Response(JSON.stringify({ orders }), { status: 200 });
      } else return new Response(null, { status: 404 });
    } catch (err) {
      console.log(err);
    }
  }

  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};

export const PUT = async (request) => {
  const orderId = request.nextUrl.searchParams.get("orderId");
  console.log(orderId);
  try {
    await connectToDB();
    await Order.findByIdAndDelete(orderId);
    return new Response(JSON.stringify({ message: "successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
