import { connectToDB } from "@utils/database";
import Product from "@models/Product";

export const GET = async (request) => {
  const productId = request.nextUrl.searchParams.get("productId")
  if (productId) {
    try {
      await connectToDB();
      const product = await Product.findOne({ _id: productId }).populate('brand');
      if (product)
        return new Response(JSON.stringify({ product }), { status: 200 });
    } catch (error) {
      console.log(error);
    }
  }
  
  return new Response(null, { status: 422 });
}