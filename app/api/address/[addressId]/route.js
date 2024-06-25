import { connectToDB } from "@utils/database";
import Address from "@models/Address";

export const GET = async (request, { params }) => {
  const { addressId } = params;
  const userId = request.nextUrl.searchParams.get("userId");
  console.log(addressId, userId)
  try {
    connectToDB()
    if (addressId && userId) {
      const specificAddress = await Address.findOne({
        userId: userId,
        _id: addressId,
      });
      if (specificAddress) {
        return new Response(
          JSON.stringify([
            specificAddress.country,
            specificAddress.streetAddress,
            specificAddress.city,
            specificAddress.state,
            specificAddress.zipcode,
          ]),
          { status: 200 }
        );
      }
    }
  } catch (error) {
    
  }
  
  return new Response(
    JSON.stringify(null),
    { status: 422 }
  );
}