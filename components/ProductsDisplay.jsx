/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ProdCard from "./ProdCard";
import { useState, useEffect, useMemo } from "react";
import { narrowCategories } from "@utils/utils";
import { testProducts } from "@utils/utils";
const ProductsDisplay = ({ products, narrowBy, setProducts, userId }) => {
  if (!products || !narrowBy[0]) return <div className="font-bold">No product found</div>;
  const [originalProducts, setOriginalProducts] = useState([])
  const [totalProd, setTotalProd] = useState(0);
  const [numOfProd, setNumOfProd] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [rangeValue, setRangeValue] = useState([]);
  const [page, setPage] = useState(1);
  const [pos, setPos] = useState(0);
  useEffect(() => {
    setOriginalProducts(() => [...products])
    setTotalProd(products.length);
    setNumOfProd(products.length);
    setRangeValue(Array.from({ length: narrowBy[0].length }, () => null));
  }, [narrowBy]);
  useEffect(() => {
    setProducts((currentProducts) => [...originalProducts]);
    setProducts((currentProducts) => [
      ...currentProducts.slice(pos, numOfProd + pos),
    ]);
   
    let filtValueProds = [];
    rangeValue.forEach((range) => {
      if (range) {
        filtValueProds.push(...[...originalProducts].filter(product => {
          if (product.casePrice > range[0]) {
            if (range[1]) {
              if (product.casePrice > range[1]) {
                return false;
              }
            }
            return true
          } 
          return false;
        }))
      }
    })
    if (filtValueProds.length) {
      setProducts(() => [...filtValueProds]);
    }
    setProducts((currentProducts) =>
      currentProducts.sort((a, b) => sortOption * (a.casePrice - b.casePrice))
    );
  }, [numOfProd, page, rangeValue, sortOption]);
  return (
    <section>
      <div>
        <div className="flex flex-col gap-[2rem]">
          <div>
            <div>
              <div className="relative flex flex-row items-start text-[.9rem] w-full justify-center">
                <div className="flex flex-row items-center gap-[5px] absolute left-0">
                  <div className="text-[.9rem]">Sort By: </div>
                  <select
                    className="border-[1px] border-black rounded-[2px] text-[.9rem]"
                    onChange={(e) => {
                      setSortOption(e.target.value);
                    }}
                  >
                    <option value="0"></option>
                    <option value="1">Sort by price: low to high</option>
                    <option value="-1">Sort by price: high to low</option>
                  </select>
                </div>
                <div className="flex flex-col items-center relative gap-[5px] ">
                  <div className="italic">
                    Showing products {pos + 1} to{" "}
                    {`${numOfProd < totalProd ? numOfProd + pos : totalProd}`}{" "}
                    of {`${totalProd}`}
                  </div>
                  <div className="flex flex-row items-center gap-[5px]">
                    <div>Show</div>
                    <select
                      className="border-[1px] border-black rounded-[2px]"
                      onChange={(e) => {
                        setNumOfProd(parseInt(e.target.value));
                        setPage(1);
                        setPos(0);
                      }}
                    >
                      <option value={`${totalProd}`}>All</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                    <div>Products Per Page</div>
                  </div>
                  <div className="flex flex-row items-center gap-[5px]">
                    {page > 1 && (
                      <div
                        className="text-Purple hover:text-red-800 cursor-pointer underline font-bold"
                        onClick={(e) => {
                          if (page > 1) {
                            setPos(pos - numOfProd);
                            setPage(page - 1);
                          }
                        }}
                      >
                        {" "}
                        &lt;&lt; Prev
                      </div>
                    )}
                    <div>Page</div>
                    {page}
                    <div> of {`${Math.ceil(totalProd / numOfProd)}`}</div>
                    {Math.ceil(totalProd / numOfProd) > 1 &&
                      Math.ceil(totalProd / numOfProd) > page && (
                        <div
                          className="text-Purple hover:text-red-800 cursor-pointer underline font-bold"
                          onClick={(e) => {
                            if (page < Math.ceil(totalProd / numOfProd)) {
                              setPos(pos + numOfProd);
                              setPage(page + 1);
                            }
                          }}
                        >
                          {" "}
                          Next &gt;&gt;
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-[5px]">
            <div className="from-LightPurple to-Purple  h-fit min-w-[12rem] bg-gradient-to-br text-white flex flex-col p-[10px]">
              <div className="text-white uppercase font-bold">Narrow By</div>
              <div className="w-full flex flex-col gap-1 text-[.8rem] items-center ">
                {narrowCategories.map((category, narrowIndex) => (
                  <div
                    key={category.name}
                    className={`border-[1px] border-r-white border-b-white border-l-[#c0c0c0] border-t-[#c0c0c0] w-full px-[10px] py-[2px] ${
                      category.quan !== 0 ? "block" : "hidden"
                    }`}
                  >
                    <div className="text-[#c0c0c0] font-bold">
                      {category.name}
                    </div>
                    <div className="flex flex-col items-start">
                      {narrowBy[narrowIndex] &&
                        narrowBy[narrowIndex].map((element, elementIndex) => (
                          <div
                            key={narrowBy[narrowIndex].name}
                            className="flex flex-row items-center gap-[5px]"
                          >
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                const newRange = [...rangeValue];
                                setRangeValue(() => {
                                  if (e.target.checked) {
                                    newRange[elementIndex] =
                                      narrowBy[narrowIndex][elementIndex].range;
                                  } else {
                                    newRange[elementIndex] = null;
                                  }

                                  return newRange;
                                });
                              }}
                            />
                            <div>{element.name}</div>
                            <div>({element.quan})</div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ProdCard products={products} userId={userId} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductsDisplay;
