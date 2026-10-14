import './style.css'

document.querySelector('[data-year]').textContent = new Date().getFullYear()

/* Steam on the mirror: wipe it with a pointer, it slowly fogs back up. */
const canvas = document.querySelector('.steam')
const glass = canvas.parentElement
const hint = document.querySelector('.hint')
const ctx = canvas.getContext('2d')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

let fog // offscreen steam texture
let w = 0
let h = 0
let dpr = 1
let last = null
let visible = true
let wiped = false

function makeFog() {
  fog = document.createElement('canvas')
  fog.width = canvas.width
  fog.height = canvas.height
  const f = fog.getContext('2d')
  f.fillStyle = 'rgb(236, 242, 240)'
  f.fillRect(0, 0, fog.width, fog.height)

  // grain
  const img = f.getImageData(0, 0, fog.width, fog.height)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 18
    d[i] += n
    d[i + 1] += n
    d[i + 2] += n
  }
  f.putImageData(img, 0, 0)

  // condensation droplets
  const count = Math.round((w * h) / 2600)
  for (let i = 0; i < count; i++) {
    const x = Math.random() * fog.width
    const y = Math.random() * fog.height
    const r = (Math.random() ** 3 * 3.2 + 0.6) * dpr
    f.beginPath()
    f.arc(x, y, r, 0, Math.PI * 2)
    f.fillStyle = 'rgba(160, 180, 176, 0.35)'
    f.fill()
    f.beginPath()
    f.arc(x - r * 0.3, y - r * 0.35, r * 0.4, 0, Math.PI * 2)
    f.fillStyle = 'rgba(255, 255, 255, 0.8)'
    f.fill()
  }
}

function resize() {
  const rect = glass.getBoundingClientRect()
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = rect.width
  h = rect.height
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  makeFog()
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 1
  ctx.drawImage(fog, 0, 0)
}

function wipe(x, y, radius = Math.max(46, Math.min(w, h) * 0.09)) {
  const r = radius * dpr
  const px = x * dpr
  const py = y * dpr
  const g = ctx.createRadialGradient(px, py, 0, px, py, r)
  g.addColorStop(0, 'rgba(0,0,0,0.95)')
  g.addColorStop(0.6, 'rgba(0,0,0,0.6)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.globalCompositeOperation = 'destination-out'
  ctx.globalAlpha = 1
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(px, py, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
}

function stroke(x, y) {
  if (last) {
    const dx = x - last.x
    const dy = y - last.y
    const steps = Math.ceil(Math.hypot(dx, dy) / 10)
    for (let i = 1; i <= steps; i++) wipe(last.x + (dx * i) / steps, last.y + (dy * i) / steps)
  } else {
    wipe(x, y)
  }
  last = { x, y }
  if (!wiped) {
    wiped = true
    hint?.classList.add('is-gone')
  }
}

function local(e) {
  const rect = canvas.getBoundingClientRect()
  return { x: e.clientX - rect.left, y: e.clientY - rect.top }
}

canvas.addEventListener('pointermove', (e) => {
  // mouse wipes on hover; touch/pen wipe while pressed
  if (e.pointerType !== 'mouse' && e.buttons === 0) return
  const p = local(e)
  stroke(p.x, p.y)
})
canvas.addEventListener('pointerdown', (e) => {
  last = null
  const p = local(e)
  stroke(p.x, p.y)
})
canvas.addEventListener('pointerleave', () => (last = null))
canvas.addEventListener('pointerup', () => (last = null))

// steam slowly returns
function regrow() {
  if (visible && !reduceMotion) {
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 0.005
    ctx.drawImage(fog, 0, 0)
    ctx.globalAlpha = 1
  }
  requestAnimationFrame(regrow)
}

// one authored moment: a finger swipes a clear streak across the glass on load
function autoWipe() {
  const start = performance.now()
  const dur = 1400
  const path = (t) => ({
    x: w * (0.04 + 0.9 * t),
    y: h * (0.62 - 0.4 * t + 0.08 * Math.sin(t * Math.PI * 2)),
  })
  let prev = null
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur)
    const eased = 1 - Math.pow(1 - t, 3)
    const p = path(eased)
    if (prev) {
      const dx = p.x - prev.x
      const dy = p.y - prev.y
      const n = Math.ceil(Math.hypot(dx, dy) / 10)
      for (let i = 1; i <= n; i++) wipe(prev.x + (dx * i) / n, prev.y + (dy * i) / n, Math.min(w, h) * 0.075)
    }
    prev = p
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(glass)

let resizeTimer
new ResizeObserver(() => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(resize, 120)
}).observe(glass)

resize()
requestAnimationFrame(regrow)

/* the closing mirror is steamed too, with one finger stroke already through it */
const still = document.querySelector('.steam--still')
function paintStill() {
  const r = still.getBoundingClientRect()
  const k = Math.min(window.devicePixelRatio || 1, 2)
  still.width = Math.round(r.width * k)
  still.height = Math.round(r.height * k)
  const c = still.getContext('2d')
  c.globalCompositeOperation = 'source-over'
  c.fillStyle = 'rgb(236, 242, 240)'
  c.fillRect(0, 0, still.width, still.height)
  c.globalCompositeOperation = 'destination-out'
  // feathered finger wipe: soft radial dabs along a curve, like the hero's brush
  const rad = still.width * 0.055
  for (let i = 0; i <= 80; i++) {
    const t = i / 80
    const x = still.width * (0.16 + 0.72 * t)
    const y = still.height * (0.84 - 0.28 * t * (1 - t) * 2 + 0.04 * t)
    const g = c.createRadialGradient(x, y, 0, x, y, rad)
    g.addColorStop(0, 'rgba(0,0,0,0.5)')
    g.addColorStop(0.6, 'rgba(0,0,0,0.3)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    c.fillStyle = g
    c.beginPath()
    c.arc(x, y, rad, 0, Math.PI * 2)
    c.fill()
  }
  c.globalCompositeOperation = 'source-over'
  for (let i = 0; i < 90; i++) {
    c.fillStyle = 'rgba(160, 180, 176, 0.35)'
    c.beginPath()
    c.arc(Math.random() * still.width, Math.random() * still.height, (Math.random() * 2.4 + 0.6) * k, 0, Math.PI * 2)
    c.fill()
  }
}
new ResizeObserver(paintStill).observe(still)
if (!reduceMotion) setTimeout(autoWipe, 700)

/* Order note → /api/enquire (Resend) */
const form = document.querySelector('#enquiry-form')
const status = form.querySelector('.pad-status')
const send = form.querySelector('.send')
const sendLabel = form.querySelector('.send-label')

function setStatus(text, isError = false) {
  status.textContent = text
  status.classList.toggle('is-error', isError)
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'))

  const data = Object.fromEntries(new FormData(form))
  const missing = ['name', 'email', 'message'].filter((k) => !form.elements[k].checkValidity())
  if (missing.length) {
    missing.forEach((k) => form.elements[k].setAttribute('aria-invalid', 'true'))
    form.elements[missing[0]].focus()
    setStatus('Fill in your name, a real email and a short note so we can reply.', true)
    return
  }

  send.disabled = true
  sendLabel.textContent = 'Sending…'
  setStatus('')
  try {
    const res = await fetch('/api/enquire', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) {
      Object.keys(body.fields ?? {}).forEach((k) => form.elements[k]?.setAttribute('aria-invalid', 'true'))
      throw new Error(body.error || 'Your note didn’t send.')
    }
    form.reset()
    form.classList.add('is-sent')
    setStatus(`thanks ${data.name.split(' ')[0]}! we’ll email you back soon 🤎`)
  } catch (err) {
    setStatus(`${err.message} Try again, or message @u_r_glistening on Instagram.`, true)
  } finally {
    send.disabled = false
    sendLabel.textContent = 'Send note'
  }
})
