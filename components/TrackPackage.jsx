"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import OrderCard from "./OrderCard";

import previousPage from "@public/assets/icons/previousPage.png";
import Image from "next/image";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

async function findNearestUPS(lat, lon) {
  const MAX_RADIUS = 1; // max degrees (~111km)
  let radius = 0.05; // start small ~1km
  let data = [];

  while (radius <= MAX_RADIUS) {
    try {
      const left = lon - radius;
      const right = lon + radius;
      const top = lat + radius;
      const bottom = lat - radius;
      const url = `https://nominatim.openstreetmap.org/search?q=UPS&format=jsonv2&limit=10&viewbox=${left},${top},${right},${bottom}&bounded=1`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": `MyApp/1.0 ${process.env.NEXT_PUBLIC_MY_EMAIL}`,
        },
      });

      data = await res.json();
      if (data.length > 0) {
        return data;
      } // found results, stop expanding
      radius *= 2; // increase radius by 0.05 degrees (~5.5km)
    } catch (error) {
      console.error("Error fetching UPS locations:", error);
    }
  }

  if (data.length === 0) return null;
}

const TrackPackage = () => {
  const { data: session } = useSession();
  const [customerlongitude, setCustomerLongitude] = useState(0);
  const [customerlatitude, setCustomerLatitude] = useState(0);
  const [address, setAddress] = useState();
  const [order, setOrder] = useState("");
  const [nearestUPS, setNearestUPS] = useState({}); // State to hold nearest UPS location
  const [progress, setProgress] = useState(0);
  const [upsAddress, setUpsAddress] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const addressObj = JSON.parse(
      decodeURIComponent(searchParams.get("address"))
    );
    setAddress(addressObj);
    const orderId = searchParams.get("id");
    if (!address) {
      const getDefaultAddress = async () => {
        const response = await fetch(
          `/api/address/getDefault?userId=${session?.user.id}`
        );
        if (response.ok) {
          const { defaultAddress } = await response.json();
          setAddress(defaultAddress);
        }
      };
      getDefaultAddress();
    }

    const getOrder = async () => {
      try {
        const response = await fetch(
          `/api/orders/${orderId}?userId=${session?.user?.id}`
        );
        if (response.ok) {
          const { order } = await response.json();
          setOrder(order);
          setProgress(order?.progress?.progressValue);
        }
      } catch (err) {}
    };
    getOrder();
  }, [session?.user?.id]);
  useEffect(() => {
    const getCustomerAddress = async () => {
      if (address) {
        const wholeAddress = `${address.streetAddress}, ${address.city}, ${address.state} ${address.zipcode}`;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            wholeAddress
          )}&format=jsonv2&limit=1`,
          {
            headers: {
              "User-Agent": `MyApp/1.0 ${process.env.NEXT_PUBLIC_MY_EMAIL}`,
            },
          }
        );

        if (!res.ok) {
          alert("Error fetching location. Please try again.");
          return;
        }
        const data = await res.json();
        if (data) {
          const { lat, lon } = data[0];
          setCustomerLatitude(parseFloat(lat));
          setCustomerLongitude(parseFloat(lon));
        } else {
          console.error("No results found for the given address.");
        }
      }
    };
    getCustomerAddress();

    if (customerlatitude && customerlongitude) {
      findNearestUPS(customerlatitude, customerlongitude)
        .then((locations) => {
          if (locations.length > 0) {
            setUpsAddress(locations[0].display_name);
            setNearestUPS(() => ({
              lat: parseFloat(locations[0].lat),
              lon: parseFloat(locations[0].lon),
            }));
          } else {
            console.error("No UPS locations found nearby.");
          }
        })
        .catch((error) => console.error("Error fetching nearest UPS:", error));
    }
  }, [address, customerlatitude, customerlongitude, nearestUPS]);

  return (
    <div className="w-full h-full">
      <div className="w-full relative group h-full flex flex-row">
        <div
          className={`left-0 top-0 z-10 bg-white mt-[2rem] ml-[2rem] w-[40%] p-5  flex flex-col items-start ${
            order?.products?.length >= 4
              ? "h-[75vh] overflow-y-scroll"
              : "h-fit"
          } gap-3`}
        >
          <div className="flex flex-col items-start">
            <div className="flex flex-row items-center gap-2">
              <div
                className="border-2 w-fit rounded-full bg-gray-300 p-2 cursor-pointer"
                onClick={() => {
                  window.history.back();
                }}
              >
                <Image src={previousPage} width={20} height={20} />
              </div>
              <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
                Tracking Your Order
              </h1>
            </div>
            {order.delivered ? (
              <span className="text-black font-bold">
                Delivered {dayjs(order.deliveredDate).format("MMMM D")}
              </span>
            ) : (
              <span className="text-green-600 font-bold">
                Arriving {dayjs(order.deliveredDate).format("MMMM D")}
              </span>
            )}{" "}
          </div>
          <div className="border-[1px] border-black w-full h-[0.5rem]  cursor-pointer">
            <div
              className={`bg-green-500  duration-1000 w-0 h-full text-white 
              ${progress <= 25 && "group-hover:w-[25%]"} 
              ${progress > 25 && progress <= 50 && "group-hover:w-[50%]"}
              ${progress > 50 && progress <= 75 && "group-hover:w-[75%]"}
              ${progress === 100 && "group-hover:w-[100%]"}
              `}
              id="progressBar"
            >
              g
            </div>
          </div>

          <div className="flex flex-row justify-between w-full font-bold">
            <span
              className={`${
                order?.progress?.progressValue <= 25 && "text-green-500"
              } `}
            >
              Preparing
            </span>
            <span
              className={`${
                order?.progress?.progressValue < 100 &&
                order.progress.progressValue > 25 &&
                "text-green-500"
              } `}
            >
              Shipping
            </span>
            <span
              className={`${
                order?.progress?.progressValue === 100 && "text-green-500"
              } `}
            >
              Delivered
            </span>
          </div>
          <OrderCard
            orders={[order]}
            order={order}
            orderIndex={0}
            session={session}
          />
        </div>
        <Map
          customer={[customerlatitude, customerlongitude]}
          customerAddress={address}
          ups={[nearestUPS.lat, nearestUPS.lon]}
          upsAddress={upsAddress}
        />
      </div>
    </div>
  );
};

export default TrackPackage;
