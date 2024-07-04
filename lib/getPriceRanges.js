export function getPriceRanges(products) {
   const priceUnder5 = {
     name: "Under 5",
     quan: products.filter((product) => product.unitPrice < 5).length,
     range: [0, 5],
   };
   const priceUnder10 = {
     name: "5 - 10",
     quan: products.filter(
       (product) => product.unitPrice > 5 && product.unitPrice < 10
     ).length,
     range: [5, 10],
   };
   const priceUnder15 = {
     name: "10 - 15",
     quan: products.filter(
       (product) => product.unitPrice > 10 && product.unitPrice < 15
     ).length,
     range: [10, 15],
   };
   const priceOver20 = {
     name: "20+",
     quan: products.filter((product) => product.unitPrice >= 20).length,
     range: [20, null],
   };
   const priceRanges = [
     priceUnder5,
     priceUnder10,
     priceUnder15,
     priceOver20,
  ].filter((element) => element.quan > 0);
  return priceRanges
}