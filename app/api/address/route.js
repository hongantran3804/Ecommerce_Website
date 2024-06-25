import { connectToDB } from "@utils/database";
import Address from "@models/Address";
import { addressInfo } from "@utils/utils";

export const POST = async (request) => {
  const { userId, country, name, phone, streetAddress, city, state, zipcode } =
    await request.json();
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
  const getDefaultAddress =
    request.nextUrl.searchParams.get("getDefaultAddress");
  const addressId =
    request.nextUrl.searchParams.get("addressId");
  console.log(addressId)
  if (userId) {
    try {
      connectToDB();
      if (getDefaultAddress) {
        const defaultAddress = await Address.findOne({
          default: true,
          userId: userId,
        });
        console.log(1)
        if (defaultAddress) {
           return new Response(
             JSON.stringify({
               addressId: defaultAddress._id,
               data: [
               defaultAddress.country,
               defaultAddress.streetAddress,
               defaultAddress.city,
               defaultAddress.state,
               defaultAddress.zipcode,
             ]}),
             { status: 200 }
           );
        }
       
      }
      
      console.log(2)
      let addresses = await Address.find({ userId: userId });
      if (addresses.length) {
        addresses = addresses.map((address) => {
          return address
        });
      }
      return new Response(JSON.stringify({ addresses }), {
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
  const userId = request.nextUrl.searchParams.get("userId");
  const addressId = request.nextUrl.searchParams.get("addressId");
  const setDefault = request.nextUrl.searchParams.get("setDefault");
  const data = JSON.parse(
    decodeURIComponent(request.nextUrl.searchParams.get("data"))
  );
  
  if (userId) {
    try {
      await connectToDB();
      if (addressId && data) {
        const [
          { value: name },
          { value: phone },
          { value: streetAddress },
          { value: city },
          { value: state },
          { value: zipcode },
        ] = data;
        const userAddress = await Address.findByIdAndUpdate(
          { _id: addressId },
          {
            name,
            phone,
            streetAddress,
            city,
            state,
            zipcode,
          }
        );
        return new Response(JSON.stringify({ message: "Success" }), {
          status: 200,
        });
      } else if (addressId) {
        console.log(addressId)
        await Address.findByIdAndUpdate(
          { _id: addressId },
          { default: setDefault }
        );
        return new Response(JSON.stringify({ message: "Success" }), {
          status: 200,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  
  return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 422 });
}

export const DELETE = async (request) => {
  const userId = request.nextUrl.searchParams.get("userId");
  const { addressId } = await request.json();
  if (userId && addressId) {
    try {
      await connectToDB();
      await Address.findByIdAndDelete({ _id: addressId, userId: userId });
      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 422 });
}