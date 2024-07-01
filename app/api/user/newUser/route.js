import { connectToDB } from "@utils/database";
import User from "@models/User";
import bcrypt from "bcrypt";
const sleep = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 350);
  });

export const POST = async (request) => {
  const { name, email, compName, phoneNumber, password, captcha } =
    await request.json();
  const confirmed = false;
  try {
    await connectToDB();
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
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
        const userExist = await User.findOne({ email: email });

        if (userExist) {
          if (userExist.confirmed) {
            return new Response(
              JSON.stringify({ message: "User already exist" }, { status: 409 })
            );
          } else {
            await User.findByIdAndDelete({_id: userExist._id });
          }
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          email,
          name,
          compName,
          phoneNumber,
          password: hashedPassword,
          confirmed,
        });
        await newUser.save();
        try {
          const emailVerification = await fetch(`${process.env.NEXTAUTH_URL}/api/emailVerification`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
              }),
            }
          );
          if (emailVerification.ok) {
            return new Response(
              JSON.stringify({ message: emailVerification.message }),
              { status: 200 }
            );
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return new Response(
    JSON.stringify({
      message: "Something went wrong",
    }),
    { status: 422 }
  );
};
