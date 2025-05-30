const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { phone, code } = req.body;

  try {
    const result = await client.verify.v2
      .services(process.env.TWILIO_SERVICE)
      .verificationChecks.create({ to: phone, code });

    res.status(200).json({ success: result.status === 'approved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
