import User from "@models/User";
export const GET = async (request,{params}) => {
  const { userId } = params ;
  try {
    const user = await User.findOne({ _id: userId });
    console.log(user)
    return new Response(JSON.stringify({user}),{status: 200});
  } catch (error) {
    console.log(error)
  }
  return new Response(null, { status: 422 });
}