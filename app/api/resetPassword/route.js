import { connectToDB } from "@utils/database";
import User from "@models/User";
import { env } from "@utils/utils";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
export const POST = async (request) => {
  const { email } = await request.json();
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.APP_PASSWORD,
    },
  });
  try {
    await connectToDB();
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const url = `/pwChange?token=${token}`;
    const verificationMessage = `
  <div>
  Do you want to update your Lacaco account password? Please click here to confirm. This link will expire in 1 hour.
  <br>
  <div class="px-[10px] py-[5px]">
  <a href="${url}">Confirm your email</a>
  </div>
  </div>
  `;
    const mailOptions = {
      from: {
        name: "Lacaco Reset Password",
        address: process.env.GMAIL_ADDRESS,
      },
      to: email,
      subject: "Verification Email For New Password",
      html: verificationMessage,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({
          message: "Cannot send verification",
        }),
        { status: 422 }
      );
    }
    return new Response(
      JSON.stringify({
        message: "Success",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Cannot connectToDB",
      }),
      { status: 422 }
    );
  }
};

export const PATCH = async (request) => {
  const { token, password } = await request.json();
  try {
    await connectToDB();

    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      try {
        const user = await User.findOne({ email });
        if (user) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          user.password = hashedPassword;
          await user.save();
          return new Response(JSON.stringify({ message: "Success" }), {
            status: 200,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error)
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};
