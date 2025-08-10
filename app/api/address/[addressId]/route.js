import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const GET = async (request, { params }) => {
  const { addressId } = params;
  const userId = request.nextUrl.searchParams.get("userId");
  try {
    if (addressId && userId) {
      const specificAddress = await Address.findOne({
        userId: userId,
        _id: addressId,
      });
      if (specificAddress) {
        const data = [
          specificAddress.country,
          specificAddress.streetAddress,
          specificAddress.city,
          specificAddress.state,
          specificAddress.zipcode,
        ];
        return new Response(JSON.stringify({ data: data }), { status: 200 });
      }
    }
  } catch (error) {
    console.log(error);
  }

  return new Response(JSON.stringify(null), { status: 422 });
};
