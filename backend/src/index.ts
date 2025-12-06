import config from './utils/config'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'backend' })
})
console.log(config)
const port = config.port
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
