import nodemailer from "nodemailer";

const user = process.env.NODEMAILER_USER_EMAIL || "";
const pass = process.env.NODEMAILER_USER_PASSWORD || "";

export const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: { user, pass },
});
