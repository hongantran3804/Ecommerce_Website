
import addressIcon from "@public/assets/icons/addressIcon.png"
import loginSecurity from "@public/assets/icons/login&security.png";
import orderIcon from "@public/assets/icons/orderIcon.png";

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
   {name:"Retail Price"}, {name: "Brands"}
]
export const dbInfo = [
  {
    label: "Photo Name",
    id: "photoName",
    type: "text",
    size: 60,
    title: "Required",
  },
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

export const accountPages = [
  {
    img: orderIcon,
    name: "Your Orders",
    desc: "Track, return, cancel an order, download invoice or buy again",
    url: `/orders`
  },
  {
    img: loginSecurity,
    name: "Login & security",
    desc: "Edit login, name, and mobile number",
    url: `/account/profile/checkUser`
  },
  {
    img: addressIcon,
    name: "Your Addresses",
    desc: "Edit, remove or set default address",
    url:`/account/address`
  },
];

export const securityFields = [
  {
    label: "Name",
    type: "text",
    id: "name",
    name: "name",
    size:15,
  },
  {
    label: "Mobile number",
    type: "text",
    id: "phoneNumber",
    name: "phone",
    size:20,
  },
  {
    label: "Company",
    type: "text",
    id: "company",
    name: "company",
    size:20,
  },
];