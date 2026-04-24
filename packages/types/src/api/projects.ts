import { z } from "zod"

export const ProjectIdSchema = z.uuid().or(z.string().min(1))

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  amenities: z.unknown().nullable(),
  timeline: z.unknown().nullable(),
})

export const ProjectResponseSchema = z.object({
  success: z.literal(true),
  project: ProjectSchema,
})

export const ListProjectsResponseSchema = z.object({
  success: z.literal(true),
  projects: z.array(ProjectSchema),
})

export const ProjectIdParamsSchema = z.object({
  id: ProjectIdSchema,
})

export const GetProjectResponseSchema = ProjectResponseSchema

export const CreateProjectBodySchema = z.object({
  name: z.string().min(1),
  status: z.string().min(1),
  amenities: z.unknown().nullable().optional(),
  timeline: z.unknown().nullable().optional(),
})

export const CreateProjectResponseSchema = GetProjectResponseSchema

export const DeleteProjectResponseSchema = z.object({
  success: z.literal(true),
  id: ProjectIdSchema,
})

export type Project = z.infer<typeof ProjectSchema>
export type ProjectResponse = z.infer<typeof ProjectResponseSchema>
export type ListProjectsResponse = z.infer<typeof ListProjectsResponseSchema>
export type CreateProjectBody = z.infer<typeof CreateProjectBodySchema>
export type CreateProjectResponse = ProjectResponse
export type ProjectIdParams = z.infer<typeof ProjectIdParamsSchema>
export type GetProjectResponse = ProjectResponse
export type DeleteProjectResponse = z.infer<typeof DeleteProjectResponseSchema>

// Above refactored from domain/
// import type { Selectable } from "kysely"
// import type { Projects, SerializeNumeric } from "../db/schema"

// type ProjectRow = Selectable<Projects>
// type ProjectDto = Omit<ProjectRow, "amenities" | "timeline"> & {
//   amenities: unknown
//   timeline: unknown
// }

// export type SerializedProject = SerializeNumeric<ProjectDto>