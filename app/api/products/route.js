import { connectToDB } from "@utils/database"
import Product from "@models/Product"
import Brand from "@models/Brand"
export const GET = async (request) => {
  const queryString = request.nextUrl.searchParams.get("queryString").toLowerCase();
  console.log(queryString)
  try {
    await connectToDB();
    let products = await Product.find({}).populate("brand");
    products = products.filter(product => product.brand.name.toLowerCase().includes(queryString) || product.prodDesc.toLowerCase().includes(queryString));
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
    console.log(products);
     return new Response(JSON.stringify({ prods: products, priceRanges }), {
       status: 200,
     });
  } catch (err) {
    console.log(err)
  }
  return new Response(null, { status: 422 });
}