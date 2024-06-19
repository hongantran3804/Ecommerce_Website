import { connectToDB } from "@utils/database";
import ShoppingCart from "@models/ShoppingCart";
import { redirect } from "next/navigation";

export const POST = async (request) => {
  const { id, product } = await request.json();
  if (id) {
    try {
      await connectToDB();
      const products = await ShoppingCart.find({ userId: id });
      if (products) {
        const idx = products.findIndex(
          (prod) => prod.product._id === product._id
        );
        if (idx >= 0) {
          const currentQuan = products[idx].product.quantity;
          await ShoppingCart.findByIdAndUpdate(products[idx]._id, {
            product: {
              ...products[idx].product,
              quantity: currentQuan + 1,
            },
          });
          await products[idx].save();
        } else {
          const shoppingCart = new ShoppingCart({
            userId: id,
            product: { ...product, quantity: 1 },
          });
          await shoppingCart.save();
        }
      } else {
        const shoppingCart = new ShoppingCart({
          userId: id,
          product: { ...product, quantity: 1 },
        });
        await shoppingCart.save();
      }
      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
    }
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 404,
    });
  }
  return new Response(null, { status: 404 });
};

export const GET = async (request) => {
  try {
    await connectToDB();
    const productDocuments = await ShoppingCart.find({});
    const products = productDocuments.map((prod) => prod.product);
    const quantity = productDocuments.map((prod) => prod.product.quantity);
    return new Response(JSON.stringify({ products, quantity }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 404,
  });
};

export const PUT = async (request) => {
  const products = JSON.parse(
    decodeURIComponent(request.nextUrl.searchParams.get("products"))
  );
  const userId = request.nextUrl.searchParams.get("userId");
  console.log(products)
  try {
    await connectToDB();
    await ShoppingCart.deleteMany({});
    await ShoppingCart.insertMany(products.map((product) => ({product:product, userId: userId })));
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 422,
    });
  }
}
