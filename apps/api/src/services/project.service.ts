import type { Project } from '@phoenix/types'

export const projectService = {
  // like index in ruby
  getAll: async (): Promise<Project[]> => {
    // Fetch from DB
    // await db.query('SELECT * FROM projects')
    // do some business logic
    return []
  },
  show: async (id: string): Promise<Project> => {
    // Fetch from DB
    // await db.query('SELECT * FROM projects WHERE id = ?', [id])
    // do some business logic
    return {} as Project
  },
  new: async (project: Project): Promise<Project> => {
    // Insert into DB
    // await db.query('INSERT INTO projects (name, description) VALUES (?, ?)', [project.name, project.description])
    // do some business logic
    return project
  },
  edit: async (project: Project): Promise<Project> => {
    // Update in DB
    // await db.query('UPDATE projects SET name = ?, description = ? WHERE id = ?', [project.name, project.description, project.id])
    // do some business logic
    return project
  }
}