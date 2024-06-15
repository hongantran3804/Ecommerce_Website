import { connectToDB } from "@utils/database";
import ShoppingCart from "@models/ShoppingCart";

export const POST = async (request) => {
  const { id, product } = await request.json();
  if (id) {
   try {
     const shoppingCart = await ShoppingCart.find({ userId: id });
     if (shoppingCart) {
       const index = shoppingCart.products.findIndex(
         (eachProd) => eachProd._id === product._id
       );
       if (index) {
         shoppingCart.products[index].quantity += 1;
       } else {
         shoppingCart.products.add({ ...product, quantity: 1 });
       }
       await shoppingCart.save();
     } else {
       const newShoppingCart = new ShoppingCart({
         userId: id,
         products: [product],
       });
       await newShoppingCart.save();
     }
     return new Response(JSON.stringify({ message: "Success" }), {
       status: 200,
     });
   } catch (err) {
     console.log(err);
    } 
    return new Response(JSON.stringify({message: "Something went wrong"}), { status: 404 });
  }
  return new Response(null, { status: 404 });
}