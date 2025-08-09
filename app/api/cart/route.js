import ShoppingCart from "@models/ShoppingCart";

export const POST = async (request) => {
  const { id, product } = await request.json();
  if (id) {
    try {
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
              quantity: currentQuan + product.quantity,
            },
          });
          await products[idx].save();
        } else {
          const shoppingCart = new ShoppingCart({
            userId: id,
            product: { ...product },
          });
          await shoppingCart.save();
        }
      } else {
        const shoppingCart = new ShoppingCart({
          userId: id,
          product: { ...product },
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
  const userId = request.nextUrl.searchParams.get("userId");
  if (userId) {
    try {
      const productDocuments = await ShoppingCart.find({ userId: userId });
      if (productDocuments.length) {
        const products = productDocuments.map((prod) => prod.product);
        const quantity = productDocuments.map((prod) => prod.product.quantity);
        return new Response(JSON.stringify({ products, quantity }), {
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({ message: "not found" }), {
          status: 404,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};

export const PUT = async (request) => {
  const { products, userId } = await request.json();
  if (userId) {
    try {
      await ShoppingCart.deleteMany({ userId: userId });
      await ShoppingCart.insertMany(
        products.map((product) => ({ product: product, userId: userId }))
      );
      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};

export const DELETE = async (request) => {
  const { product, userId } = await request.json();
  try {
    let productDocuments = await ShoppingCart.find({ userId: userId });
    const targetIdx = productDocuments.findIndex(
      (prod) => prod.product._id === product._id
    );
    await ShoppingCart.findByIdAndDelete(productDocuments[targetIdx]._id);
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};
