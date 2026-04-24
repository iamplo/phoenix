import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { 
  CreateProjectBodySchema, 
  CreateProjectResponseSchema, 
  ListProjectsResponseSchema, 
  GetProjectResponseSchema, 
  ProjectIdParamsSchema, 
  DeleteProjectResponseSchema} from '@phoenix/types'

import { ProjectHandler } from './handlers/project.handler'
import { AppError } from './lib/errors'
import { apiHeaders } from './middleware/api-headers'

// Route layer responsibilities
// - validate transport /transform data in memory
// - trhow if invalid
// - ensure payload conforms to Z contracts before sending

const getProjectsRoute = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      description: 'List projects',
      content: {
        'application/json': {
          schema: ListProjectsResponseSchema,
        },
      },
    },
  },
})

const getProjectRoute = createRoute({
  method: 'get',
  path: '/:id',
  request: {
    params: ProjectIdParamsSchema,
  },
  responses: {
    200: {
      description: 'Get project by id',
      content: {
        'application/json': {
          schema: GetProjectResponseSchema,
        },
      },
    },
  },
})

const createProjectRoute = createRoute({
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json' : {
          schema: CreateProjectBodySchema,
        }
      }
    }
  },
  responses: {
    200 : {
      description: 'Create project',
      content: {
        'application/json': { schema : CreateProjectResponseSchema }
      }
    }
  }
})

const deleteProjectRoute = createRoute({
  method: 'delete',
  path: '/:id',
  request: {
    params: ProjectIdParamsSchema,
  },
  responses: {
    200 : {
      description: 'Delete project',
      content: {
        'application/json': { schema : DeleteProjectResponseSchema }
      }
    }
  }
})

// const getProjectRoute = defineOpenAPIRoute({
//   route: createRoute({
//     method: 'get',
//     path: '/api/v1/projects/:id',  
//     request: {
//       params: z.object({ id: z.string() }),
//     },
//     responses: {
//       200: {
//         description: 'Get a project',
//         content: {
//           'application/json': {
//             schema: ProjectResponseSchema,
//           },
//         },
//       },
//     },
//   }),
//   handler: async (c) => {
//     const id = c.req.param('id')
//     const project = await ProjectHandler.show(id)
//     const payload = ProjectResponseSchema.parse({ success: true, project})
//     return c.json(payload)
//   }
// })

const projectsApp = new OpenAPIHono()

projectsApp.basePath('api/v1/projects')

const routes = projectsApp.openapi(getProjectsRoute, async (c) => {
  const projects = await ProjectHandler.getAll()
  const payload = ListProjectsResponseSchema.parse({ success: true, projects })
  return c.json(payload, 200)
})
.openapi(getProjectRoute, async (c) => {
  const { id } = c.req.valid("param")
  const project = await ProjectHandler.show(id)
  const payload = GetProjectResponseSchema.parse({ success: true, project })
  return c.json(payload, 200)
})
.openapi(createProjectRoute, async (c) => {
  const body = c.req.valid('json')
  const project = await ProjectHandler.new(body)
  const payload = GetProjectResponseSchema.parse({ success: true, project })
  return c.json(payload, 200)
})
.openapi(deleteProjectRoute, async (c) => {
  const { id } = c.req.valid("param")
  const { id : projectId} = await ProjectHandler.delete(id)
  const payload = DeleteProjectResponseSchema.parse({ success: true, id: projectId })
  return c.json(payload, 200)
})


const app = new OpenAPIHono()

app.use('/api/v1/*', apiHeaders)

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

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})


const api = app.route('/api/v1/projects', routes)

export type AppType = typeof api

export default {
  port: 8787,
  fetch: api.fetch,
}
