import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
import { getPriceRanges } from "@lib/getPriceRanges";
export const GET = async (request) => {
  try {
    let brands = await Brand.find({});
    let products = await Product.find({}).populate("brand");
    const priceRanges = getPriceRanges(products);
    products = products.filter((product) => product.numInStock > 0);
    brands = brands.map((brand) => ({
      id: brand._id.toString(),
      name: brand.name,
      quan: products.filter((product) => product.brand.name === brand.name)
        .length,
    }));
    return new Response(
      JSON.stringify({ brands, prods: products, priceRanges }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};
