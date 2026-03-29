import formidable from "formidable";
import nodemailer from "nodemailer";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const form = formidable({ maxTotalFileSize: 40 * 1024 * 1024 });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const get = (key) =>
      Array.isArray(fields[key]) ? fields[key][0] : fields[key] || "";

    const html = `
      <h2 style="color:#a855f7">💅 New Nail Order from ${get("Name")}!</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;border:1px solid #eee"><b>Name</b></td><td style="padding:8px;border:1px solid #eee">${get("Name")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee"><b>Email</b></td><td style="padding:8px;border:1px solid #eee">${get("Email")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee"><b>CashApp</b></td><td style="padding:8px;border:1px solid #eee">${get("CashApp_Username")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee"><b>Address</b></td><td style="padding:8px;border:1px solid #eee">${get("Shipping_Address")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee"><b>State</b></td><td style="padding:8px;border:1px solid #eee">${get("State")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee"><b>Shipping</b></td><td style="padding:8px;border:1px solid #eee">${get("Shipping_Cost")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee"><b>Order Total</b></td><td style="padding:8px;border:1px solid #eee">${get("Order_Total")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee"><b>Items</b></td><td style="padding:8px;border:1px solid #eee">${get("Items_Ordered")}</td></tr>
        ${get("Custom_Nail_Description") ? `<tr><td style="padding:8px;border:1px solid #eee"><b>Custom Request</b></td><td style="padding:8px;border:1px solid #eee">${get("Custom_Nail_Description")}</td></tr>` : ""}
      </table>
      <p style="margin-top:16px;color:#666">Hand photos and inspiration photos are attached below.</p>
    `;

    const attachments = [];
    for (const fileArray of Object.values(files)) {
      const arr = Array.isArray(fileArray) ? fileArray : [fileArray];
      for (const file of arr) {
        if (file && file.filepath) {
          attachments.push({
            filename: file.originalFilename || "photo.jpg",
            content: fs.readFileSync(file.filepath),
          });
        }
      }
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Gracie's Nails Orders" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: get("Email"),
      subject: `💅 New Order from ${get("Name")} — ${get("Order_Total")}`,
      html,
      attachments,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send order email" });
  }
}
