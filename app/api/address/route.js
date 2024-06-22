import { connectToDB } from "@utils/database";
import Address from "@models/Address";
import { addressInfo } from "@utils/utils";

export const POST = async (request) => {
  const { userId, country, name, phone, streetAddress, city, state, zipcode } =
    await request.json();
  console.log(userId)
  if (userId) {
    try {
      await connectToDB();
      const newAddress = new Address({
        userId,
        country,
        name,
        phone,
        streetAddress,
        city,
        state,
        zipcode,
        default:false,
      });
      await newAddress.save();
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
  console.log(userId);
  if (userId) {
    try {
      connectToDB();
      const addresses = await Address.find({ userId: userId });
      console.log(addresses)
      return new Response(JSON.stringify({addresses}), {
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

export const PUT = async (request) => {
  const addressId = request.nextUrl.searchParams.get("addressId");
  const setDefault = request.nextUrl.searchParams.get("setDefault");
  const data = JSON.parse(
    decodeURIComponent(request.nextUrl.searchParams.get("data"))
  );
  console.log(setDefault)
  if (addressId !== null && data !== null) {
    const [{ value: name }, { value: phone }, { value: streetAddress},{ value: city}, {value: state}, {value: zipcode}] = data
    try {
      await connectToDB();
      const userAddress = await Address.findByIdAndUpdate({ _id: addressId }, {
        name, phone, streetAddress, city, state, zipcode
      });
      return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
    } catch (err) {
      console.log(err)
    }
  } else if(addressId !== null && setDefault !== null) {
    try {
      await connectToDB();
      await Address.findByIdAndUpdate({ _id: addressId }, { default: setDefault });
      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    } catch (err) {
      console.log(err)
    }
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 422 });
}
