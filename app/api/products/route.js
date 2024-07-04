import { connectToDB } from "@utils/database";
import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
import { getPriceRanges } from "@lib/getPriceRanges";
export const GET = async (request) => {
  const queryString = request.nextUrl.searchParams
    ?.get("queryString")
    ?.toLowerCase();
  if (queryString) {
    
    try {
      await connectToDB();
      const brands = await Brand.find({});
      let products = await Product.find({}).populate("brand");
      products = products.filter(
        (product) =>
          product.brand.name.toLowerCase().includes(queryString) ||
          product.prodDesc.toLowerCase().includes(queryString)
      );
      const priceRanges = getPriceRanges(products);
      products = products.filter((product) => product.numInStock > 0);
      return new Response(
        JSON.stringify({ prods: products, priceRanges, brands }),
        {
          status: 200,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  return new Response(null, { status: 422 });
};
