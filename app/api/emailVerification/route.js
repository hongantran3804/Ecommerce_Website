import jwt from "jsonwebtoken";
import { connectToDB } from "@utils/database";
export const POST = async (request) => {
  const env = require("@env/env"),
    userEmail = await request.json(),
    nodemailer = require("nodemailer"),
    token = jwt.sign({ email: userEmail }, env["JWT_SECRET"], {
      expiresIn: "1h",
    }),
    url = `http://localhost:3000/api/emailVerification/confirmation/${token}`,
    transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: env["GMAIL_ADDRESS"],
        pass: env["APP_PASSWORD"],
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
      address: env["GMAIL_ADDRESS"],
    },
    to: "hongantran3804@gmail.com",
    subject: "Your Lacaco Account Email Confirmation Link",
    html: verificationMessage,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    return new Response(
      JSON.stringify(
        {
          message: "Cannot send email verification",
        },
        
      ),{ status: 422 }
    );
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 422,
  });
};
