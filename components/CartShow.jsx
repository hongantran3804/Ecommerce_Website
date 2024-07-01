import Image from "next/image";
import React, { useState, useEffect } from "react";
import defaultImg from "@public/assets/images/defaultProductPhoto.png";
const CartShow = ({
  products,
  quantity,
  setQuantity,
  userId,
  checkoutPage,
}) => {
  const [update, setUpdate] = useState([]);
  useEffect(() => {
    setUpdate(Array.from({ length: products.length }, () => true));
  }, [products]);
  const handleDelete = async (e, product, quantityValue) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: { ...product, quantityValue },
          userId,
        }),
      });
    } catch (err) {}
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let checkoutProducts = products.filter((product, index) => {
        if (quantity[index].included && quantity[index].value > 0) {
          return true;
        }
      });
      const filtQuantity = quantity.filter(
        (each) => each.included && each.value
      );
      checkoutProducts = checkoutProducts.map((product, index) => ({
        ...product,
        quantity: filtQuantity[index].value,
      }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: checkoutProducts,
          userId,
        }),
      });
    } catch (err) {}
  };
  return (
    <div>
      {products.map((product, index) => (
        <div
          key={product.upc}
          className={`w-full flex flex-row items-start font-bold ${
            !checkoutPage &&
            "border-t-[1px] border-b-[1px] border-t-gray-300 border-b-gray-300"
          } py-[1rem] text-[.9rem] ${
            quantity[index]?.included ? "opacity-100" : "opacity-50"
          }`}
        >
          {/* {!checkoutPage && (
            <input
              type="checkbox"
              checked={quantity[index]?.included}
              className="self-center mr-4"
              onChange={(e) => {
                setQuantity(() => {
                  const newQuantity = [...quantity];
                  if (newQuantity[index]?.included !== null)
                    newQuantity[index].included = e.target.checked;
                  return newQuantity;
                });
              }}
            />
          )} */}
          <div className="flex flex-row items-start flex-1 gap-4 h-fit">
            <div className="h-full">
              <Image
                src={
                  product?.photo
                    ? process.env.NEXT_PUBLIC_DOMAIN_PHOTO + product?.photo
                    : defaultImg
                }
                width={100}
                height={100}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-between items-start w-[80%]">
              <div>{product?.prodDesc}</div>
              <div>{product?.brand?.name}</div>
              {checkoutPage && (
                <div className="font-bold">
                  $
                  {(product.casePrice * 100 * quantity[index]?.value) / 100
                    ? Math.round(
                        product.casePrice * 100 * quantity[index]?.value
                      ) / 100
                    : 0}
                </div>
              )}
              <div className="flex flex-row items-center gap-3">
                {update[index] ? (
                  <div className="flex flex-row items-center gap-3">
                    <div>
                      <strong>Quantity:</strong>{" "}
                      {`${quantity[index]?.value ? quantity[index]?.value : 0}`}
                    </div>
                    <div
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() => {
                        setUpdate(() => {
                          const newUpdate = [...update];
                          newUpdate[index] = false;
                          return newUpdate;
                        });
                      }}
                    >
                      Update
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-3">
                    <input
                      defaultValue={quantity[index]?.value}
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      className="border-[1px] border-black w-[3.5rem] pl-[1rem]"
                      onChange={(e) => {
                        setQuantity(() => {
                          const newQuantity = [...quantity];
                          if (parseInt(e.target.value) !== NaN) {
                            if (newQuantity[index]?.value !== null)
                              newQuantity[index].value = parseInt(
                                e.target.value
                              );
                          }
                          return newQuantity;
                        });
                      }}
                    />
                    <div
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={(e) => {
                        setUpdate(() => {
                          const newUpdate = [...update];
                          newUpdate[index] = true;
                          return newUpdate;
                        });
                        handleSave(e);
                      }}
                    >
                      Save
                    </div>
                  </div>
                )}

                <div
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={(e) => {
                    setQuantity(() => {
                      const newQuantity = [...quantity];
                      newQuantity.splice(index, 1);
                      return newQuantity;
                    });
                    handleDelete(e, product, quantity[index].value);
                    products.splice(index, 1);
                  }}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
          {!checkoutPage && (
            <div className="font-bold">
              $
              {(product.casePrice * 100 * quantity[index]?.value) / 100
                ? Math.round(product.casePrice * 100 * quantity[index]?.value) /
                  100
                : 0}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CartShow;
