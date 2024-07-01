"use client";
import React, { useEffect, useState } from "react";
import { securityFields } from "@utils/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
const ProfileForm = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [fieldValues, setFieldValues] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${session?.user?.id}`);
        if (response.ok) {
          const { user } = await response.json();
          setUser(user);
          setFieldValues([user?.name, user?.phoneNumber, user?.compName]);
        }
      } catch (error) {}
    };
    getUser();
  }, [session?.user]);
  return (
    <div>
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        Login & Security
      </h1>
      <div className="border-[1px] border-gray-300 rounded-[10px]">
        {securityFields.map((field, index) => (
          <div
            key={field.label}
            className={`${"border-b-[1px] border-gray-300"} p-5 flex flex-row items-start justify-between`}
          >
            <div className="flex flex-col items-start">
              <span>{field.label}</span>
              <span>
                {fieldValues[index] ? (
                  fieldValues[index]
                ) : (
                  <span className="text-red-700">Missing</span>
                )}
              </span>
            </div>
            <Link
              href={{
                pathname: "/account/profile/edit",
                query: {
                  data: encodeURIComponent(
                    JSON.stringify({
                      oldValue: fieldValues[index],
                      name: field.name,
                      type: field.type,
                      size: field.size,
                      label: field.label,
                      id: field.id,
                    })
                  ),
                },
              }}
            >
              <div className="border-[1px] border-gray-200 py-1 px-[5rem] rounded-[10px] text-[.9rem] shadow-buttonShadowcursor-pointer cursor-pointer">
                Edit
              </div>
            </Link>
          </div>
        ))}
        {user?.password && (
          <div className={`p-5 flex flex-row items-start justify-between`}>
            <div className="flex flex-col items-start">
              <span>Password</span>
              {!user?.password && <span className="text-red-700">Missing</span>}
            </div>
            <Link
              href={{
                pathname: "/account/profile/edit",
                query: {
                  data: encodeURIComponent(
                    JSON.stringify({
                      name: "password",
                      type: "password",
                      size: 20,
                      label: "Password",
                      id: "password",
                    })
                  ),
                },
              }}
            >
              <div className="border-[1px] border-gray-200 py-1 px-[5rem] rounded-[10px] text-[.9rem] shadow-buttonShadowcursor-pointer cursor-pointer">
                Edit
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
