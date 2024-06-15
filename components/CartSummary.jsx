/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { testProducts } from "@utils/utils";

export const CartShow = ({ products, quantity, setQuantity }) => {
  const [update, setUpdate] = useState(Array.from({length: products.length}, () => (true)));
  
  return (
    <div>
      {products.map((product, index) => (
        <div
          className={`w-full flex flex-row items-start border-t-[1px] border-b-[1px] border-t-gray-300 border-b-gray-300 py-[1rem] text-[.9rem] ${
            quantity[index].included ? "opacity-100" : "opacity-50"
          }`}
          key={product.upc}
        >
          <input
            type="checkbox"
            checked={quantity[index].included}
            className="self-center mr-4"
            onChange={(e) => {
              setQuantity(() => {
                const newQuantity = [...quantity];
                newQuantity[index].included = e.target.checked;
                return newQuantity;
              });
            }}
          />
          <div className="flex flex-row items-start flex-1 gap-4 h-fit">
            <div className="h-full">
              <Image src={product.photo} />
            </div>
            <div className="flex flex-col justify-between items-start  h-[10rem] w-[80%]">
              <div>
                <strong>Product Description:</strong> {product.prodDesc}
              </div>
              <div>
                <strong>Brand:</strong> {product.brand.name}
              </div>
              <div>
                <strong>UPC:</strong> {product.upc}
              </div>
              <div>
                <strong>Case:</strong> {product.caseVal}
              </div>
              <div className="flex flex-row items-center gap-3">
                {update[index] ? (
                  <div className="flex flex-row items-center gap-3">
                    <div>
                      <strong>Quantity:</strong> {`${quantity[index].value}`}
                    </div>
                    <div
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() => {
                        setUpdate(() => {
                          const newUpdate = [...update];
                          newUpdate[index] = false;
                          return newUpdate
                        });
                      }}
                    >
                      Update
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-3">
                    <input
                      defaultValue={quantity[index].value}
                      type="number"
                      id="quantity"
                      name="quantity"
                      className="border-[1px] border-black w-[3.5rem] pl-[1rem]"
                      onChange={(e) => {
                        setQuantity(() => {
                          const newQuantity = [...quantity];
                          if (parseInt(e.target.value) !== NaN) {
                            newQuantity[index].value = parseInt(e.target.value);
                          }
                          return newQuantity;
                        });
                      }}
                    />
                    <div
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() => {
                        setUpdate(() => {
                            const newUpdate = [...update];
                            newUpdate[index] = true;
                            return newUpdate;
                        });
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
                    testProducts.splice(index, 1);
                  }}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
          <div className="font-bold">
            ${product.price * quantity[index].value}
          </div>
        </div>
      ))}
    </div>
  );
}
const CartSummary = ({ products, oldQuantity }) => {
  
  const [quantity, setQuantity] = useState(
    oldQuantity ? [...oldQuantity] :
    Array.from({ length: testProducts.length }, () => ({
      value: 1,
      included: true,
    }))
  ); 
  const [totalPrice, setTotalPrice] = useState(0);
  const [numOfProd, setNumOfProd] = useState(0);
  useEffect(() => {
    let calTotal = 0;
    let calNum = 0;
    quantity.forEach((element, index) => {
      if (element.included) {
        calTotal += element.value * testProducts[index].price * 100;
        calNum += element.value;
      }
    });
    setTotalPrice(calTotal);
    setNumOfProd(calNum);
  }, [quantity]);
  return (
    <section>
      <div>
        <div className="flex flex-row gap-5 items-start">
          <div className="flex flex-col mb-[2rem] flex-1">
            <div className="self-end">Price</div>
            <CartShow
              products={testProducts}
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <div className="self-end font-bold">
              {`Subtotal (${numOfProd} items):`}{" "}
              <span className="font-extrabold">${`${totalPrice / 100}`}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center border-[1px] border-gray-300 p-5">
              <div className="self-end font-bold">
                {`Subtotal (${numOfProd} items):`}{" "}
                <span className="font-extrabold">${`${totalPrice / 100}`}</span>
              </div>
              <a
                href={`/checkout?quantity[]=${encodeURIComponent(
                  JSON.stringify(
                    quantity.filter((eachQUan) => eachQUan.included)
                  )
                )}&products[]=${encodeURIComponent(
                  JSON.stringify(
                    testProducts.filter(
                      (product, index) => quantity[index].included
                    )
                  )
                )}`}
              >
                <div className=" bg-LightPurple text-[.8rem] p-1 w-full text-center rounded-[5px] font-bold cursor-pointer hover:bg-Purple text-white">
                  Proceed to checkout
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSummary;
