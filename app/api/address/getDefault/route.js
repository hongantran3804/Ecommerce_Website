import Address from "@models/Address";
export const GET = async (request) => {
  const userId = request.nextUrl.searchParams.get("userId");
  if (userId) {
    try {
      let defaultAddress = await Address.findOne({
        userId: userId,
        default: true,
      });
      if (defaultAddress) {
        defaultAddress._id = defaultAddress._id.toString();
        return new Response(JSON.stringify({ defaultAddress }), {
          status: 200,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return new Response(null, { status: 404 });
};
