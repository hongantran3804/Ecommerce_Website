import { connectToDB } from "@utils/database";
import dayjs from "dayjs";
import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const POST = async (request) => {
  const { products, userId, orderPlacedDate, deliveredDate, total, addressId } =
    await request.json();
  const now = dayjs();
  const progress = Math.round(
    (now.diff(dayjs(orderPlacedDate)) * 100) / dayjs(deliveredDate).diff(now)
  );
  if (addressId && userId) {
    try {
      await connectToDB();
      const newProgress = new Progress({
        progressValue: progress,
        userId: userId,
      });
      await newProgress.save();
      const newOrder = new Order({
        userId: userId,
        address: addressId,
        products: products,
        orderPlacedDate: new Date(orderPlacedDate),
        deliveredDate: new Date(deliveredDate),
        total,
        delivered: false,
        progress: newProgress._id,
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
      let orders = await Order.find({ userId: userId })
        .populate("address")
        .populate("progress");
      orders.forEach(async (order) => {
        await Progress.updateOne(
          { _id: order.progress._id },
          {
            progressValue: Math.round(
              (now.diff(dayjs(order.orderPlacedDate)) * 100) /
                dayjs(order.deliveredDate).diff(now)
            ),
          }
        );
      });
      orders = await Order.find({ userId: userId })
        .populate("address")
        .populate("progress");
      if (orders.length) {
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
  try {
    await connectToDB();
    const order = await Order.findOne({ _id: orderId });
    await Progress.findByIdAndDelete({ _id: order.progress._id });
    await Order.findByIdAndDelete(orderId);
    return new Response(JSON.stringify({ message: "successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
