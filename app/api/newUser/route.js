import { redirect } from "next/navigation";
import { connectToDB } from "@utils/database";
import User from "@models/User";
const sleep = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 350);
  });

export const POST = async (request) => {
  const env = require("@env/env");
  const { name, email, compName, phoneNumber, password, captcha } =
    await request.json();
  const confirmed = false;
  try {
    await connectToDB();
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${env["RECAPTCHA_SECRET_KEY"]}&response=${captcha}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        method: "POST",
      }
    );

    const { success } = await response.json();
    if (success) {
      await sleep();
      try {
        const userExist = await User.findOne({ email });
        if (userExist)
          return new Response(
            JSON.stringify({ message: "User already exist" }, { status: 409 })
          );
        const newUser = new User({
          email,
          name,
          compName,
          phoneNumber,
          password,
          confirmed,
        });
        await newUser.save();
        try {
          const emailVerification = await fetch(
            "http://localhost:3000/api/emailVerification",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: newUser.email,
              }),
            }
          );
          return new Response(
            JSON.stringify({ message: emailVerification.message }),
            { status: 200 }
          );
        } catch (err) {
          return new Response(
            JSON.stringify({ message: "Cannot send email verification" }),
            {
              status: 422,
            }
          );
        }
      } catch (err) {
        return new Response(JSON.stringify({ message: "Cannot create User" }), {
          status: 422,
        });
      }
    }
    return new Response(
      JSON.stringify({
        message: "Unproccesable request, Invalid captcha code",
      }),
      { status: 422 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
      { status: 422 }
    );
  }
};
