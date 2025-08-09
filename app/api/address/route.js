import Address from "@models/Address";

export const POST = async (request) => {
  const {
    userId,
    country,
    name,
    phone,
    streetAddress,
    city,
    state,
    zipcode,
    defaultStatus,
  } = await request.json();
  if (userId) {
    try {
      const address = await Address.findOne({
        userId: userId,
        zipcode: zipcode,
        city: city,
        state: state,
      });
      if (address)
        return new Response(null, {
          status: 200,
        });
      const addresses = await Address.find({ userId: userId });
      if (defaultStatus) {
        await Address.updateMany({ userId: userId }, { default: false });
        const newAddress = new Address({
          userId,
          country,
          name,
          phone,
          streetAddress,
          city,
          state,
          zipcode,
          default: defaultStatus,
        });
        await newAddress.save();
      } else {
        const newAddress = new Address({
          userId,
          country,
          name,
          phone,
          streetAddress,
          city,
          state,
          zipcode,
          default: addresses.length === 0 ? true : false,
        });
        await newAddress.save();
      }

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
      const addresses = await Address.find({ userId: userId });
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
  const { userId, addressId, data, defaultStatus } = await request.json();
  const [
    { value: name },
    { value: phone },
    { value: streetAddress },
    { value: city },
    { value: state },
    { value: zipcode },
  ] = data;
  if (userId) {
    try {
      if (defaultStatus) {
        await Address.updateMany({ userId: userId }, { default: false });
        await Address.findByIdAndUpdate(
          { _id: addressId },
          {
            name,
            phone,
            streetAddress,
            city,
            state,
            zipcode,
            default: defaultStatus,
          }
        );
      } else {
        await Address.updateOne(
          { userId: userId, _id: addressId },
          {
            name,
            phone,
            streetAddress,
            city,
            state,
            zipcode,
          }
        );
      }
      return new Response(null, { status: 200 });
    } catch (err) {
      console.log(err);
    }
  }

  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};

export const DELETE = async (request) => {
  const userId = request.nextUrl.searchParams.get("userId");
  const { addressId } = await request.json();
  if (userId && addressId) {
    try {
      await Address.findByIdAndDelete({ _id: addressId, userId: userId });
      const address = await Address.findOne({ userId: userId });
      if (address) {
        address.default = true;
        address.save();
      }
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
