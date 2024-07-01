import jwt from "jsonwebtoken";
import { connectToDB } from "@utils/database";
export const POST = async (request) => {
  const { email } = await request.json()
  
    const nodemailer = require("nodemailer")
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
  
    const url = `${process.env.NEXTAUTH_URL}/api/emailVerification/confirmation/${token}`
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.APP_PASSWORD,
      },
    });
  const verificationMessage = `
  <div>
  Please click on the button below to confirm your email to continue with account registration. This link will expire in 1 hour.
  <br>
  <div class="px-[10px] py-[5px]">
  <a href="${url}">Confirm your email</a>
  </div>
  </div>
  `;
  const mailOptions = {
    from: {
      name: "Lacaco Account",
      address: process.env.GMAIL_ADDRESS,
    },
    to: email,
    subject: "Your Lacaco Account Email Confirmation Link",
    html: verificationMessage,
  };
  try {
    await transporter.sendMail(mailOptions);
    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.log(error)
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};
