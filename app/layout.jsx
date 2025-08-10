/* eslint-disable @next/next/no-sync-scripts */
import { connectToDB } from "@utils/database";
import React from "react";
import Nav from "@components/Nav";
import "@styles/global.css";
import Provider from "@components/Provider";
import "leaflet/dist/leaflet.css";
export const metadata = {
  title: "HongAn EShop",
};
await connectToDB();
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body className="flex flex-col items-center h-full">
          <div className="w-full bg-Purple text-white sticky z-50 top-0">
            <Nav />
          </div>
          <div className="w-[100%] gap-[0.4rem] flex flex-col px-[10rem] flex-1">
            <div className="flex flex-row items-start gap-5 h-full">
              <div className="flex flex-row items-start w-full h-full">
                <div className="flex-1 h-full">{children}</div>
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
