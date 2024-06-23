import prod1 from "@public/assets/images/prod1.png";
import prod2 from "@public/assets/images/prod2.png";
import prod3 from "@public/assets/images/prod3.png";
import prod4 from "@public/assets/images/prod4.png";
import prod5 from "@public/assets/images/prod5.png";
import prod6 from "@public/assets/images/prod6.png";
export const categories = [
  {
    name: "Cosmetics",
    options: [
      {
        name: "* Shop By Manufacturer *",
      },
      { name: "*eye - Eye Lashes" },
      { name: "*nail" },
      { name: "Blush/powder" },
      { name: "Bronzer" },
      { name: "Cases And Bags" },
      {
        name: "Cos Beauty Tools",
      },
      {
        name: "Dcos20-unassigned",
      },
      {
        name: "Eye",
      },
      {
        name: "Fashion Accessories",
      },
      {
        name: "Foundation/concealer/liquid Makeup",
      },
      {
        name: "Fragance",
      },
      {
        name: "Glitter/shimmer",
      },
      {
        name: "Highlighter",
      },
      {
        name: "Lip",
      },
      { name: "Makeup Removers" },
      { name: "Nail" },
      { name: "Primer/setting Spray" },
      { name: "Tint" },
    ],
  },
  {
    name: "Beauty Care",
    options: [{ name: "Aromatherapy" }],
  },
  {
    name: "Home/school/office",
  },
  { name: "General Merchandise" },
  {
    name: "Kitchen",
  },
  {
    name: "Home Essentials",
  },
  { name: "Hardware" },
  { name: "Toys" },
  { name: "Clothing" },
  { name: "Health & Wellness" },
];
export const pageCategories = [
  {
    name: "A.i.i. Clubman",
    options: [
      {
        name: "Eye",
      },
      { name: "Fashion Accessories" },
      {
        name: "Makeup Removers",
      },
      {
        name: "Nail",
      },
    ],
  },
];
export const shoppingTools = [
  { name: "Search Products" },
  { name: "Cosmetic Parts Order Forms" },
];

export const becomeCustomerInfo = [
  {
    label: "Email Address",
    id: "email",
    name: "email",
    type: "text",
    size: "60",
    title: "xxxxx@xxxx.xxx",
  },
  {
    label: "Your Name",
    id: "name",
    name: "name",
    type: "text",
    size: "60",
    title: "Required",
  },
  {
    label: "Company Name",
    id: "compName",
    name: "compName",
    type: "text",
    size: "60",
    title: "Required",
  },
  {
    label: "Phone Number",
    id: "phone",
    name: "phone",
    type: "tel",
    size: "20",
    title: "xxx-xxx-xxxx",
  },
  {
    label: "Password",
    id: "password",
    name: "password",
    type: "password",
    size: "15",
    title: "Required",
  },
  {
    label: "Password (again)",
    id: "pw2",
    name: "pw2",
    type: "password",
    size: "15",
    title: "Required",
  },
];
const env = require("@env/env");

export { env };


export const prodReqInfo = [
  {
    label: "Name",
    id: "name",
    name: "name",
    type: "text",
    size: "40",
    title: "Required",
  },
  {
    label: "Email Address",
    id: "email",
    name: "email",
    type: "text",
    size: "60",
    title: "xxxxx@xxxx.xxx",
  },
  {
    label: "Phone Number",
    id: "phone",
    name: "phone",
    type: "tel",
    size: "20",
    title: "xxx-xxx-xxxx",
  },
  {
    label: "UPC",
    id: "upc",
    name: "upc",
    size: "30",
  },
  {
    label: "Product Description",
    id: "prodDesc",
    name: "prodDesc",
    size: "80",
  },
];
export const narrowCategories = [
   {name:"Retail Price"}, 
]
export const dbInfo = [
  {
    label: "Brand",
    id: "brand",
    type: "text",
    size: 60,
    title: "Required",
  },
  {
    label: "Product Description",
    name: "prodDesc",
    id: "prodDesc",
    type: "text",
    size: 60,
    title: "Required",
  },
  {
    label: "UPC",
    name: "upc",
    id: "upc",
    type: "text",
    size: 60,
    title: "Required",
  },
  {
    label: "Unit Price",
    name: "price",
    id: "price",
    type: "text",
    size: 60,
    title: "Required",
  },
  {
    label: "Unit per Case",
    name: "case",
    id: "case",
    type: "text",
    size: 60,
    title: "Required",
  },
  {
    label: "Number in Stock",
    name: "stock",
    id: "stock",
    type: "text",
    size: 60,
    title: "Required",
  },
];

export const testProducts = [
  {
    photo: prod1,
    brand: {
      name: "NYX",
    },
    caseVal: 72,
    upc: "11111",
    prodDesc: "hello",
    price: 14.99,
  },
  {
    photo: prod2,
    brand: {
      name: "NYX",
    },
    caseVal: 72,
    upc: "11111",
    prodDesc: "hello",
    price: 14.99,
  },
  {
    photo: prod3,
    brand: {
      name: "NYX",
    },
    caseVal: 72,
    upc: "11111",
    prodDesc: "hello",
    price: 14.99,
  },
  {
    photo: prod4,
    brand: {
      name: "NYX",
    },
    caseVal: 72,
    upc: "11111",
    prodDesc: "hello",
    price: 14.99,
  },
  {
    photo: prod5,
    brand: {
      name: "NYX",
    },
    caseVal: 72,
    upc: "11111",
    prodDesc: "hello",
    price: 14.99,
  },
  {
    photo: prod6,
    brand: {
      name: "NYX",
    },
    caseVal: 72,
    upc: "11111",
    prodDesc: "hello",
    price: 14.99,
  },
  {
    photo: prod6,
    brand: {
      name: "NYX",
    },
    caseVal: 72,
    upc: "11111",
    prodDesc: "hello",
    price: 14.99,
  },
  {
    photo: prod6,
    brand: {
      name: "NYX",
    },
    caseVal: 72,
    upc: "11111",
    prodDesc: "hello",
    price: 14.99,
  },
  {
    photo: prod6,
    brand: {
      name: "NYX",
    },
    caseVal: 72,
    upc: "11111",
    prodDesc: "hello",
    price: 14.99,
  },
  {
    photo: prod6,
    brand: {
      name: "NYX",
    },
    caseVal: 72,
    upc: "11111",
    prodDesc: "hello",
    price: 15.99,
  },
  
];

export const checkoutNav = [
  {
    label: "Adresses",
    url: "/checkout"
  },
  {
    label: "Review items and shipping",
    url:"/checkout/review"
  },
];

export const addressInfo = [
  {
    label: "Full name (First and Last name)",
    type: "text",
    name: "name",
    id: "name",
    title: "Required",
    size: 60,
  },
  {
    label: "Phone number",
    type: "text",
    name: "phone",
    id: "phone",
    title: "Required",
    size: 60,
  },
  {
    label: "Street Address",
    type: "text",
    name: "address",
    id: "address",
    title: "Required",
    size: 60,
  },
  {
    label: "City",
    type: "text",
    name: "city",
    id: "city",
    title: "Required",
    size: 20,
  },
  {
    label: "State",
    type: "text",
    name: "state",
    id: "state",
    title: "Required",
    size: 20,
  },
  {
    label: "ZIP Code",
    type: "text",
    name: "zipcode",
    id: "zipcode",
    title: "Required",
    size: 20,
  },
];