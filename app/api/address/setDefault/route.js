import Address from "@models/Address";
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
