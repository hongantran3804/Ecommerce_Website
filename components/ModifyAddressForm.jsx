import React from "react";
import close from "@public/assets/icons/close.png";
import { addressInfo } from "@utils/utils";
import Image from "next/image";
const ModifyAddressForm = ({
  status,
  session,
  inputValue,
  setInputValue,
  setToggleAddressBoard,
  EditAddress,
  setDefaultStatus,
  defaultStatus,
}) => {
  const AddAddress = async (e) => {
    e.preventDefault();
    if (
      inputValue.filter((input) => input.value === null || input.value === "")
        .length > 0
    )
      return;

    try {
      const response = await fetch(`/api/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          country: "United States",
          name: inputValue[0].value.trim(),
          phone: inputValue[1].value.trim(),
          streetAddress: inputValue[2].value.trim(),
          city: inputValue[3].value.trim(),
          state: inputValue[4].value.trim(),
          zipcode: inputValue[5].value.trim(),
          defaultStatus: defaultStatus,
        }),
      });
      if (response.ok) {
        setInputValue(
          Array.from({ length: addressInfo.length }, () => ({ value: "" }))
        );
      }
    } catch (err) {}
  };
  return (
    <div className="absolute bg-white text-[.9rem] flex flex-col items-start gap-1 p-5 border-2 left-[25%]">
      <div
        className="self-end cursor-pointer"
        onClick={() => {
          setToggleAddressBoard(false);
        }}
      >
        <Image src={close} className="w-[2rem]" />
      </div>
      <div className="text-[.9rem] flex flex-col items-start">
        <span className="font-bold">Country/Region</span>
        <span>United States</span>
      </div>
      <form
        className="flex flex-col items-start gap-1"
        onSubmit={(e) => {
          if (status) {
            AddAddress(e);
          } else {
            EditAddress(e);
          }
        }}
      >
        {addressInfo.map((address, index) => (
          <div key={addressInfo.label}>
            <div
              className={`flex flex-col items-start ${
                inputValue[index]?.value === null && "border-red-700"
              }`}
            >
              <label htmlFor={address.id} className="font-bold">
                {address.label}
              </label>
              <input
                id={address.id}
                type={address.type}
                size={address.size}
                name={address.name}
                value={inputValue[index]?.value}
                className="border-[1px] border-black px-2 py-1"
                onChange={(e) => {
                  setInputValue(() => {
                    const newInputValue = [...inputValue];
                    newInputValue[index].value = e.target.value;
                    return newInputValue;
                  });
                }}
              />
              {inputValue[index]?.value === null && (
                <div className="border-red-700">This info is missing</div>
              )}
            </div>
          </div>
        ))}
        <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            name="makeDefaultInput"
            id="makeDefaultInput"
            onChange={(e) => {
              setDefaultStatus(e.target.checked);
            }}
          />
          <label htmlFor="makeDefaultInput">Make this my default address</label>
        </div>

        <input
          className={`border-[1px] border-black bg-LightPurple active:bg-Purple text-white px-2 py-1 ${
            inputValue.filter(
              (input) => input.value === null || input.value === ""
            ).length > 0
              ? "opacity-50"
              : "opacity-100 cursor-pointer"
          } mt-2`}
          type="submit"
          value={`${status ? "Add" : "Edit"}`}
        />
      </form>
    </div>
  );
};

export default ModifyAddressForm;
