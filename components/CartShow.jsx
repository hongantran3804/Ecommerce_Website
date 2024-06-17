import Image from "next/image";
import React, { useState, useEffect } from "react";
import defaultImg from "@public/assets/images/defaultProductPhoto.png";
const CartShow = ({ products, quantity, setQuantity, userId }) => {
  if (!products || !quantity) return;
  const [update, setUpdate] = useState(
    Array.from({ length: products.length }, () => true)
  );
  useEffect(() => {
    setUpdate(Array.from({ length: products.length }, () => true));
  },[products])
  return (
    <div>
      {products.map((product, index) => (
        <div
          className={`w-full flex flex-row items-start border-t-[1px] border-b-[1px] border-t-gray-300 border-b-gray-300 py-[1rem] text-[.9rem] ${
            quantity[index]?.included ? "opacity-100" : "opacity-50"
          }`}
          key={product.upc}
        >
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
          <div className="flex flex-row items-start flex-1 gap-4 h-fit">
            <div className="h-full">
              <Image src={product.photo ? product.photo : defaultImg} />
            </div>
            <div className="flex flex-col justify-between items-start  h-[10rem] w-[80%]">
              <div>
                <strong>Product Description:</strong> {product?.prodDesc}
              </div>
              <div>
                <strong>Brand:</strong> {product?.brand?.name}
              </div>
              <div>
                <strong>UPC:</strong> {product?.upc}
              </div>
              <div>
                <strong>Case:</strong> {product?.caseVal}
              </div>
              <div className="flex flex-row items-center gap-3">
                {update[index] ? (
                  <div className="flex flex-row items-center gap-3">
                    <div>
                      <strong>Quantity:</strong> {`${quantity[index]?.value?quantity[index]?.value:0}`}
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
                    products.splice(index, 1);
                  }}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
          <div className="font-bold">
            $
            {(product.price * 100 * quantity[index]?.value) / 100
              ? Math.round(product.price * 100 * quantity[index]?.value) / 100
              : 0}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartShow;
