import Product from "@models/Product";
import Brand from "@models/Brand";
import { getPriceRanges } from "@lib/getPriceRanges";
export const GET = async (request, { params }) => {
  try {
    const { brandId } = params;
    const url = new URL(request.url);

    let products = [];
    const brand = await Brand.find({_id: brandId});
    if (brandId) {
      products = await Product.find({ brand: brandId }).populate("brand");
    }
    const priceRanges = getPriceRanges(products)
    products = products.filter((product) => product.numInStock > 0);
    console.log(1)
    return new Response(JSON.stringify({ prods: products, priceRanges, brand }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
  return new Response(null, { status: 422 });
};
