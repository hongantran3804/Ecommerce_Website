"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api"; // indicate whether the map is loaded or not
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import OrderCard from "./OrderCard";
const TrackPackage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const now = dayjs();
  const { data: session } = useSession();
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [address, setAddress] = useState();
  const [order, setOrder] = useState("");
  const [openWindow, setOpenWindow] = useState(true);
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const addressObj = JSON.parse(
      decodeURIComponent(searchParams.get("address"))
    );
    const orderId = searchParams.get("id");
    setAddress(addressObj);
    const getOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/orders/${orderId}?userId=${session?.user?.id}`
        );
        if (response.ok) {
          const { order } = await response.json();
          setOrder(order);
        }
      } catch (err) {
        alert(err);
      }
    };
    getOrder();
  }, [session?.user?.id]);
  useEffect(() => {
    if (address) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address.streetAddress +
            ", " +
            address.city +
            " " +
            address.state +
            " " +
            address.zipcode
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setLatitude(lat);
            setLongitude(lng);
          } else {
            console.error("No results found for the given address.");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [address]);
  const center = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [longitude, latitude]
  );
  const [map, setMap] = useState(/**@type google.maps.Map */ (null));
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        Tracking Your Order
      </h1>
      <div className="w-full relative">
        <div
          className={`absolute left-0 top-0 z-10 bg-white mt-[2rem] ml-[2rem] w-[38%] p-5 overflow-y-scroll flex flex-col items-start ${
            order?.products?.length >= 2 ? "h-[50vh]" : "h-fit"
          } gap-3`}
        >
          <div className="flex flex-col items-start">
            {order.delivered ? (
              <span className="text-black font-bold">
                `Delivered` {dayjs(order.deliveredDate).format("MMMM D")}
              </span>
            ) : (
              <span className="text-green-600 font-bold">
                Arriving {dayjs(order.deliveredDate).format("MMMM D")}
              </span>
            )}{" "}
          </div>
          <div className="border-[1px] border-black w-full h-[0.5rem] group">
            <div
              className={`bg-green-500 w-[${order?.progress?.progressValue ? order?.progress?.progressValue : 0}%] h-full text-white`}
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
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "55vh" }}
          mapContainerClassName="relative"
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {/* Display markes, or directions */}
          <Marker
            position={center}
            className="relative"
            onClick={() => {
              setOpenWindow(true);
            }}
          >
            {openWindow && (
              <InfoWindow
                position={center}
                onCloseClick={() => {
                  setOpenWindow(false);
                }}
              >
                <div className="text-center w-fit">
                  <div>{session?.user?.name}</div>
                  <div>{order?.address?.streetAddress}</div>
                  <div className="uppercase">
                    <span>{order?.address?.city}, </span>
                    <span>{order?.address?.state} </span>
                    <span>{order?.address?.zipcode}</span>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      </div>
    </div>
  );
};

export default TrackPackage;
