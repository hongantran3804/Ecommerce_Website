import { connectToDB } from "@utils/database"
import Brand from "@models/Brand"
import Product from "@models/Product";
export const GET = async (request) => {
  try {
    await connectToDB();
    const elements = await Brand.find({})
    const products = await Product.find({}).populate('brand')
    const priceUnder5 = {
      name: "Under 5",
      quan: products.filter((product) => product.price < 5).length,
      range: [0, 5],
    };
    const priceUnder10 = {
      name: "5 - 10",
      quan: products.filter(
        (product) => product.price > 5 && product.price < 10
      ).length,
      range: [5, 10],
    };
    const priceUnder15 = {
      name: "10 - 15",
      quan: products.filter(
        (product) => product.price > 10 && product.price < 15
      ).length,
      range: [10, 15],
    };
    const priceUnder20 = {
      name: "15 - 20",
      quan: products.filter(
        (product) => product.price > 15 && product.price < 20
      ).length,
      range: [15, 20],
    };
    const priceOver20 = {
      name: "20+",
      quan: products.filter((product) => product.price >= 20).length,
      range: [20, null],
    };
    const priceRanges = [
      priceUnder5,
      priceUnder10,
      priceUnder15,
      priceUnder20,
      priceOver20,
    ].filter((ele) => ele.quan > 0);
    console.log("brands")
    return new Response(JSON.stringify({container:elements,prods: products, priceRanges}), {status: 200})
  } catch (err) {
    console.log(err)
  }
  return new Response(JSON.stringify({message: "Something went wrong"}), { status: 422 });
}