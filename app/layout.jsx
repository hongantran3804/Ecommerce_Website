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
        <body className="flex flex-col items-center">
          <div className="w-full bg-Purple text-white sticky z-50 top-0">
            <Nav />
          </div>

          <div className="w-[100%] gap-[0.4rem] flex flex-col px-[10rem]">
            <div className="flex flex-row items-start gap-5">
              <div className="flex-1 flex flex-col">
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
