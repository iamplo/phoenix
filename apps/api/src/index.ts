import { Hono } from 'hono'
import { ProjectHandler } from './handlers/project.handler'
import { AppError } from './lib/errors'
import { apiHeaders } from './middleware/api-headers'

const app = new Hono()
  .use('/api/v1/*', apiHeaders)
  .get('/', (c) => c.json({ message: 'Hello from Hono API' }))

.get('/api/v1/projects', (c) => {
  return ProjectHandler.getAll(c)
})

.post('/api/v1/projects', (c) => {
  return ProjectHandler.new(c)
})

.get('/api/v1/projects/:id', (c) => {
  return ProjectHandler.show(c)
})

.put('/api/v1/projects/:id', (c) => {
  return ProjectHandler.edit(c)
})

.delete('/api/v1/projects/:id', (c) => {
  return ProjectHandler.delete(c)
})

.get('/api/v1/health', (c) => {
  console.log('Health check endpoint hit')
  return c.json({ status: 'ok' })
})

app.onError((err, c) => {
  if (err instanceof AppError) {
    c.status(err.statusCode)
    return c.json({ success: false, error: { code: err.code, message: err.message } })
  }

  console.error(err)
  c.status(500)
  return c.json({
    success: false,
    error: { code: "INTERNAL_ERROR", message: "Internal server error" },
  })
})
  
export type AppType = typeof app

export default {
  port: 8787,
  fetch: app.fetch,
}
