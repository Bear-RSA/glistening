import { Resend } from 'resend'

/*
  POST /api/enquire
  Sends an order note from the landing page to the Glistening inbox via Resend.

  Env:
    RESEND_API_KEY   required, from resend.com/api-keys
    ENQUIRY_TO       required, inbox that receives order notes (comma-separate for several)
    ENQUIRY_FROM     sender; must be on a domain verified in Resend.
                     Defaults to Resend's test sender, which can only deliver to your own Resend account email.
    SEND_CONFIRMATION  "true" to also email the customer a copy (needs a verified domain in ENQUIRY_FROM)
*/

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escape = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

export async function POST(request) {
  let data
  try {
    data = await request.json()
  } catch {
    return json(400, { error: 'Something went wrong reading your note. Please try again.' })
  }

  // honeypot: bots fill every field
  if (data.company) return json(200, { ok: true })

  const name = String(data.name ?? '').trim().slice(0, 100)
  const email = String(data.email ?? '').trim().slice(0, 200)
  const phone = String(data.phone ?? '').trim().slice(0, 30)
  const message = String(data.message ?? '').trim().slice(0, 2000)

  const fields = {}
  if (!name) fields.name = 'Add your name.'
  if (!EMAIL.test(email)) fields.email = 'Add an email address we can reply to.'
  if (!message) fields.message = 'Tell us a little about your hair or what you’d like.'
  if (Object.keys(fields).length) return json(422, { error: 'A few details are missing.', fields })

  const { RESEND_API_KEY, ENQUIRY_TO, ENQUIRY_FROM, SEND_CONFIRMATION } = process.env
  if (!RESEND_API_KEY || !ENQUIRY_TO) {
    console.error('enquire: RESEND_API_KEY or ENQUIRY_TO is not set')
    return json(500, { error: 'Our inbox isn’t connected yet.' })
  }

  const resend = new Resend(RESEND_API_KEY)
  const from = ENQUIRY_FROM || 'Glistening <onboarding@resend.dev>'

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
  ]
  const html = `
    <div style="font-family:system-ui,sans-serif;color:#3a1e16;max-width:560px">
      <h2 style="margin:0 0 16px">New order note</h2>
      <table style="border-collapse:collapse;margin-bottom:16px">
        ${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;font-weight:700">${k}</td><td>${escape(v)}</td></tr>`).join('')}
      </table>
      <p style="white-space:pre-wrap;background:#f7e27c;padding:16px;border-radius:4px">${escape(message)}</p>
      <p style="color:#5b382d;font-size:13px">Reply to this email to answer ${escape(name)} directly.</p>
    </div>`

  const { error } = await resend.emails.send({
    from,
    to: ENQUIRY_TO.split(',').map((s) => s.trim()).filter(Boolean),
    replyTo: email,
    subject: `Order note from ${name}`,
    html,
    text: `New order note\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\n${message}`,
  })

  if (error) {
    console.error('enquire: resend error', error)
    return json(502, { error: 'Your note didn’t send.' })
  }

  if (SEND_CONFIRMATION === 'true') {
    const { error: confirmError } = await resend.emails.send({
      from,
      to: email,
      subject: 'We got your note 🤎',
      text: `Hey ${name},\n\nThanks for your note. We'll email you back soon with what suits your hair.\n\nGlistening\nSulphate-free haircare · Malmesbury, South Africa`,
    })
    if (confirmError) console.error('enquire: confirmation failed', confirmError)
  }

  return json(200, { ok: true })
}
