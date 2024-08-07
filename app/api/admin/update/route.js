
import { connectToDB } from "@utils/database";
import Product from "@models/Product";
import Brand from "@models/Brand";
import Order from "@models/Order";
import Address from "@models/Address";
import ShoppingCart from "@models/ShoppingCart";
import User from "@models/User";
import Progress from "@models/Progress";
export const POST = async (request) => {
  let { photo,brand, prodDesc, upc, unitPrice, unitPerCase, numInStock } =
    await request.json();
  brand = brand.trim();
  upc = upc.replace(" ", "");
  unitPrice = unitPrice.replace(" ").replace("$", "");
  unitPerCase = unitPerCase.replace(" ", "");
  numInStock = numInStock.replace(" ", "");
  try {
    await connectToDB();
    const brandExist = await Brand.findOne({ name: brand });
    if (brandExist) {
      const productExist = await Product.findOne({ upc: upc });
      if (!productExist) {
        const product = new Product({
          photo: photo,
          prodDesc: prodDesc,
          upc: upc,
          unitPrice: parseFloat(unitPrice),
          casePrice:
            Math.round(parseFloat(unitPrice) * 100 * parseInt(unitPerCase)) /
            100,
          brand: brandExist._id,
          unitPerCase: parseInt(unitPerCase),
          numInStock: parseInt(numInStock),
          numPurchased:0,
        });
       await product.save();
      } else {
        await Product.findByIdAndUpdate(productExist._id, {
          photo: photo,
          prodDesc: prodDesc,
          upc: upc,
          unitPrice: parseFloat(unitPrice),
          casePrice:
            Math.round(parseFloat(unitPrice) * 100 * parseInt(unitPerCase)) /
            100,
          brand: brandExist._id,
          unitPerCase: parseInt(unitPerCase),
          numInStock: parseInt(numInStock),
          numPurchased: 0,
        });
      }
    } else {
      const brandProd = new Brand({ name: brand, numPurchased: 0 });
      await brandProd.save();
      
      const product = new Product({
        photo: photo,
        prodDesc: prodDesc,
        upc: upc,
        unitPrice: parseFloat(unitPrice),
        casePrice:
          Math.round(parseFloat(unitPrice) * 100 * parseInt(unitPerCase)) / 100,
        brand: brandProd._id,
        unitPerCase: parseInt(unitPerCase),
        numInStock: parseInt(numInStock),
        numPurchased: 0,
      });
      await product.save();
    }

    return new Response(
      JSON.stringify({ message: "Success" }, { status: 200 })
    );
  } catch (error) {
    console.log(error);
    
  }
  return new Response(
    JSON.stringify({ message: "Something went wrong" }, { status: 422 })
  );
};
