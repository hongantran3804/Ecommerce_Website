import Brand from "@models/Brand";
import { connectToDB } from "@utils/database";
import Product from "@models/Product";
export const POST = async (request) => {
  let { brand, prodDesc, upc, price, caseVal } = await request.json();
  brand = brand.trim()
  upc = upc.replace(" ", "");
  price = price.replace(" ").replace("$", "");
  caseVal = caseVal.replace(" ", "");
  try {
    await connectToDB();
    const brandExist = await Brand.findOne({ name: brand });
    if (brandExist) {
      const productExist = await Product.findOne({ upc: upc });
      if (!productExist) {
        const product = new Product({
          photo: "",
          prodDesc: prodDesc,
          upc: upc,
          price: parseFloat(price),
          brand: brandExist._id,
          caseVal: parseInt(caseVal),
          popularity: 0,
        });

        await product.save();
      }
    } else {
      const brandProd = new Brand({ name: brand });
      await brandProd.save();
      const product = new Product({
        photo: null,
        prodDesc: prodDesc,
        upc: upc,
        price: parseFloat(price),
        brand: brandProd._id,
        caseVal: parseInt(caseVal),
        popularity: 0,
      });
      await product.save();
    }

    return new Response(
      JSON.stringify({ message: "Success" }, { status: 200 })
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong" }, { status: 422 })
    );
  }
};
