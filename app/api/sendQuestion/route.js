
import { env } from "@utils/utils";
export const POST = async (req) => {
  const { name, email, phoneNumber,UPC, prodDesc, message  } = await req.json();
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
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
  From: ${name} &#60;${email}&#62;<br>
  Phone Number: ${phoneNumber}<br>
  Product Description: ${prodDesc ? prodDesc : "N/A"}<br>
  UPC: ${UPC ? UPC : "N/A"}<br>
  Message: ${message ? message : "N/A"}
  </div>
  `;
  const mailOptions = {
    from: {
      name: "Lacaco Account",
      address: env["GMAIL_ADDRESS"],
    },
    to: "hongantran3804@gmail.com",
    subject: "Customer Question",
    html: verificationMessage,
  };
  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({message: "Cannot Send Email"}),{ status: 500 });
  }

}