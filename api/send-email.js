export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, data } = req.body || {};
    if (!type || !data) {
      return res.status(400).json({ error: "Missing payload" });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "no-reply@t-acquisition.com";
    const toEmail = "t-wells@t-acquisition.com";

    if (!resendApiKey) {
      return res.status(500).json({ error: "Missing RESEND_API_KEY environment variable" });
    }

    const subject = type === "investor"
      ? "New Investor Request - Team Acquisition"
      : "New Prospect Request - Team Acquisition";

    const lines = Object.entries(data).map(([k, v]) => `<li><strong>${k}:</strong> ${String(v)}</li>`).join("");
    const html = `
      <h2>${subject}</h2>
      <p>Team Acquisition is a registered company in Madagascar (not an individual freelancer).</p>
      <ul>${lines}</ul>
    `;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        html
      })
    });

    if (!emailRes.ok) {
      const txt = await emailRes.text();
      return res.status(500).json({ error: `Email provider error: ${txt}` });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown server error" });
  }
}
