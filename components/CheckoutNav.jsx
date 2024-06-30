import React from "react";
import { checkoutNav } from "@utils/utils";
import Link from "next/link";
const CheckoutNav = ({ page }) => {
  return (
    <div className="bg-gray-200 border-blue-800 border-t-[1px] border-b-[1px]">
      <ul className="flex flex-row items-center  text-blue-600  active:text-blue-900 w-[30%] justify-between px-2 py-1 ">
        {checkoutNav.map((each, index) => (
          <div
            key={each.url}
            className={`${
              index === page && "after:checkoutChosen "
            } relative hover:after:checkoutChosen `}
          >
            <Link href={each.url}>
              <li>{each.label}</li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutNav;
