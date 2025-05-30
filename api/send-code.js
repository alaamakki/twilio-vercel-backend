const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { phone } = req.body;

  try {
    const response = await client.verify.v2
      .services(process.env.TWILIO_SERVICE)
      .verifications.create({ to: phone, channel: 'sms' });

    res.status(200).json({ success: true, sid: response.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
