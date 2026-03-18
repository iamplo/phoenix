import type { Context } from "hono"
import { projectService } from "../services/project.service"

export const projectHandler = {
  getAll: async (c: Context) => {
    const projects = await projectService.getAll()
    return c.json({ success: true, data: projects })
  },
  new: async (c: Context) => {
    const project = await c.req.json()
    const newProject = await projectService.new(project)
    return c.json({ success: true, data: newProject })
  },
  show: async (c: Context) => {
    const id = c.req.param('id')
    if (!id) {
      return c.json({ success: false, message: 'Project ID is required' }, 400)
    }
    const project = await projectService.show(id)
    return c.json({ success: true, data: project })
  },
  edit: async (c: Context) => {
    const project = await c.req.json()
    const updatedProject = await projectService.edit(project)
    return c.json({ success: true, data: updatedProject })
  }
}