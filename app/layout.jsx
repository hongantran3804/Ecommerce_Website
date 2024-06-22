/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
import Nav from "@components/Nav";
import "@styles/global.css";
import Provider from "@components/Provider";
import Departments from "@components/Departments";
import SearchInput from "@components/SearchInput";
export const metadata = {
  title: "eShop",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body className="flex flex-col items-center pt-[1vh] ">
          <div className="w-[65%] gap-[0.4rem] flex flex-col">
            <Nav />
            <div className="flex flex-row items-start gap-5">
              <div className="w-[max(9.8vw,10rem)] shadow-navBoxShadow ">
                <div id="departmentView">
                  <div
                    className="bg-gradient-to-br from-LightPurple from-1% via-Purple to-Purple  w-full text-white border-[1px] 
                border-black pt-[0.1rem] pb-[0.5rem] px-[5px] rounded-t-[5px]"
                  >
                    All Brands
                  </div>
                  <Departments />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <SearchInput />
                <div className="flex-1">{children}</div>
              </div>
            </div>
          </div>
          <script stc="https://code.jquery.com/jquery-3.4.1.min.js"></script>
          <script
            type="text/javascript"
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          ></script>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
