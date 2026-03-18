import { Hono } from 'hono'
import { projectHandler } from './handlers/project.handler'

const app = new Hono()
.get('/', (c) => c.json({ message: 'Hello from Hono API' }))
.get('/api/v1/projects', projectHandler.getAll)
.post('/api/v1/projects', projectHandler.new)
.get('/api/v1/health', (c) => {
  c.header("Access-Control-Allow-Origin", "*")
  console.log('Health check endpoint hit')
  return c.json({ status: 'ok' })
})

// const app = new Hono()
//   .get('/api/hello', (c) => {
//     return c.json({
//       message: 'Hello from Hono!',
//       timestamp: Date.now()
//     })
//   })
  
export type AppType = typeof app

export default {
  port: 8787,
  fetch: app.fetch,
}
