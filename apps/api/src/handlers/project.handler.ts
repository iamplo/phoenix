import type { Context } from "hono"
import { ProjectService } from "../services/project.service"
import { ValidationError } from "../lib/errors"

// Validate request shape/params.

export class ProjectHandler {
  public static async getAll(c: Context) {
    const projects = await ProjectService.getAll()
    return c.json({ success: true, data: projects })
  }

  public static async new(c: Context) {
    const project = await c.req.json()
    const newProject = await ProjectService.new(project)
    return c.json({ success: true, data: newProject })
  }

  public static async show(c: Context) {
    const id = c.req.param('id')
    if (!id) {
      throw new ValidationError("Project ID is required")
    }

    const project = await ProjectService.show(id)
    return c.json({ success: true, data: project })
  }
  
  public static async edit(c: Context) {
    const id = c.req.param('id')
    if (!id) {
      throw new ValidationError("Project ID is required")
    }

    const project = await c.req.json()
    const updatedProject = await ProjectService.edit(id, project)
    return c.json({ success: true, data: updatedProject })
  }

  public static async delete(c: Context) {
    const id = c.req.param('id')
    if (!id) {
      throw new ValidationError("Project ID is required")
    }

    const deletedProject = await ProjectService.delete(id)
    return c.json({ success: true, data: deletedProject })
  }
}