import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const PUT = async (request) => {
  const { userId, addressId, defaultStatus } = await request.json();
  try {
    if (!defaultStatus) return new Response(null, { status: 200 });
    await Address.updateMany({ userId: userId }, { default: false });
    await Address.findByIdAndUpdate(
      { _id: addressId },
      { default: defaultStatus }
    );
    return new Response(null, { status: 200 });
  } catch (error) {
    console.log(error);
  }
  return new Response(null, { status: 422 });
};
