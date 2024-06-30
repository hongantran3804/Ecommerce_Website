"use client";

import { useEffect, useState } from "react";
const Success = () => {
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    setAmount(searchParams.get("amount"));
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500 w-full">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${amount / 100}
        </div>
      </div>
    </main>
  );
};

export default Success;