import type { CreateProjectBody, Project } from '@phoenix/types'
import { ProjectService } from "../services/project.service"
import { ValidationError } from "../lib/errors"

// Handler 
// - Orchestrates service calls, map response DTOs
// - prefer receiving typed parsed input from route

export class ProjectHandler {
  public static async getAll() {
    const rows = await ProjectService.getAll()
    const projects: Project[] = rows.map((row) => ({
      ...row,
      amenities: row.amenities,
      timeline: row.timeline,
    }))
    return projects
  }

  public static async new(input: CreateProjectBody) {
    return  ProjectService.new(input)
  }

  public static async show(id: string) {
    const project = await ProjectService.show(id)
    return project
  }
  
  public static async edit(id: string) {
    if (!id) {
      throw new ValidationError("Project ID is required")
    }

  }

  public static async delete(id: string) {
    const deletedProject = await ProjectService.delete(id)
    return deletedProject
  }
}