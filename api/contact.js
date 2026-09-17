// Vercel serverless function — receives the contact form and relays it by e-mail via Resend.
// Requires RESEND_API_KEY and CONTACT_TO_EMAIL to be set in Vercel project env vars.
// See .env.example for the full list.

const MAX_FIELD_LENGTH = 2000;

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitize(value) {
  return typeof value === 'string' ? value.slice(0, MAX_FIELD_LENGTH).trim() : '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const company = sanitize(body.company);
  const phone = sanitize(body.phone);
  const subject = sanitize(body.subject) || 'Autre demande';
  const message = sanitize(body.message);

  if (!name || !message || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Champs requis manquants ou invalides.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'SRTF Site <onboarding@resend.dev>';

  if (!apiKey || !toEmail) {
    console.error('Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.');
    return res.status(503).json({ error: "Service d'envoi non configuré." });
  }

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[Site SRTF] Nouvelle demande — ${subject}`,
        text: [
          `Nom : ${name}`,
          company && `Société : ${company}`,
          `E-mail : ${email}`,
          phone && `Téléphone : ${phone}`,
          `Domaine : ${subject}`,
          '',
          message,
        ].filter(Boolean).join('\n'),
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error('Resend API error:', errText);
      return res.status(502).json({ error: "Échec de l'envoi." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form send failed:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
