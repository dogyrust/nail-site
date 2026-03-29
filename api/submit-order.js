import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { name, email, cashapp, address, state, shippingCost, orderTotal, items, customDesc, photos } = req.body;

    const row = (label, value) =>
      `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">${label}</td><td style="padding:8px;border:1px solid #eee">${value}</td></tr>`;

    const html = `
      <h2 style="color:#a855f7">💅 New Nail Order from ${name}!</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        ${row("Name", name)}
        ${row("Email", email)}
        ${row("CashApp", cashapp)}
        ${row("Address", address)}
        ${row("State", state)}
        ${row("Shipping", shippingCost)}
        ${row("Order Total", orderTotal)}
        ${row("Items", items)}
        ${customDesc ? row("Custom Request", customDesc) : ""}
      </table>
      <p style="margin-top:16px;color:#666">Hand photos and inspiration photos are attached below.</p>
    `;

    const attachments = (photos || []).map((p) => ({
      filename: p.name,
      content: Buffer.from(p.data, "base64"),
      contentType: p.type,
    }));

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
      replyTo: email,
      subject: `💅 New Order from ${name} — ${orderTotal}`,
      html,
      attachments,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
