import { defineConfig, loadEnv } from 'vite'

// In `npm run dev`, serve /api/enquire with the same handler Vercel deploys,
// so the order form works locally with the keys in .env.local.
function apiRoutes() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/enquire', async (req, res) => {
        const mod = await server.ssrLoadModule('/api/enquire.js')
        const handler = mod[req.method]
        if (!handler) {
          res.statusCode = 405
          return res.end()
        }
        const chunks = []
        for await (const c of req) chunks.push(c)
        const request = new Request(`http://localhost${req.originalUrl}`, {
          method: req.method,
          headers: req.headers,
          body: chunks.length ? Buffer.concat(chunks) : undefined,
        })
        const response = await handler(request)
        res.statusCode = response.status
        response.headers.forEach((v, k) => res.setHeader(k, v))
        res.end(Buffer.from(await response.arrayBuffer()))
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return { plugins: [apiRoutes()] }
})
