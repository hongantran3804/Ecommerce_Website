import { connectToDB } from "@utils/database";
import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const { brandId } = params;
    const url = new URL(request.url);

    let products = [];
    if (brandId) {
      products = await Product.find({ brand: brandId }).populate("brand");
    }
    const priceUnder100 = {
      name: "Under 100",
      quan: products.filter((product) => product.casePrice < 100).length,
      range: [0, 100],
    };
    const priceUnder500 = {
      name: "100 - 500",
      quan: products.filter(
        (product) => product.casePrice > 100 && product.casePrice < 500
      ).length,
      range: [100, 500],
    };
    const priceUnder1000 = {
      name: "500 - 1000",
      quan: products.filter(
        (product) => product.casePrice > 500 && product.casePrice < 1000
      ).length,
      range: [500, 1000],
    };
    const priceOver1000 = {
      name: "1000+",
      quan: products.filter((product) => product.casePrice >= 1000).length,
      range: [1000, null],
    };
    const priceRanges = [
      priceUnder100,
      priceUnder500,
      priceUnder1000,
      priceOver1000,
    ].filter((element) => element.quan > 0);
    products = products.filter((product) => product.numInStock > 0);
    return new Response(JSON.stringify({ prods: products, priceRanges }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
  return new Response(null, { status: 422 });
};
