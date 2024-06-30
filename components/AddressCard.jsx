import React from 'react'
import { addressInfo } from "@utils/utils";
const AddressCard = ({
  address,
  session,
  setStatus,
  setToggleAddressBoard,
  setInputValue,
  setAddressId
}) => {
   
  const deleteAddress = async (e, addressId) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/address?userId=${session?.user?.id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            addressId,
          }),
        }
      );
      if (response.ok) {
        // location.reload()
        setInputValue((curr) =>
          Array.from({ length: addressInfo.length }, () => ({ value: "" }))
        );
      }
    } catch (e) {}
  };
  return (
    <div className="border-2  flex flex-col  w-[20rem] h-[20rem] rounded-[10px] cursor-pointer justify-between">
      <div>
        {address.default && <div className="text-[.9rem] text-gray-500 border-b-2 w-full pl-5 py-2">
          Default Address
        </div>}
        <div className="flex flex-col items-start p-5 text-[1rem]">
          <span className="font-bold">{session?.user.name}</span>
          <span className="uppercase">{address.streetAddress}</span>
          <span className="uppercase">
            {address.city}, {address.state} {address.zipcode}
          </span>
          <span>{address.country}</span>
        </div>
      </div>

      <div className="p-5 cursor-pointer font-bold flex flex-row items-center gap-2 ">
        <span className="text-Purple hover:underline hover:text-red-700" onClick={() => {
          setAddressId(address._id);
          setStatus(false);
          setInputValue(() => [
            { value: address.name },
            { value: address.phone },
            { value: address.streetAddress },
            { value: address.city },
            { value: address.state },
            { value: address.zipcode },
          ]);
          setToggleAddressBoard(true);
        }}>
          Edit
        </span>
        <span>|</span>
        <span className="text-Purple hover:underline hover:text-red-700"
          onClick={(e) => {
          deleteAddress(e, address._id)
        }}>
          Remove
        </span>
      </div>
    </div>
  );
};

export default AddressCard