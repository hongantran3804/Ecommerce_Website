import React from "react";
const layout = ({ children }) => {
  return (
    <div>
      <div>
        <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
          Checkout
        </h1>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
