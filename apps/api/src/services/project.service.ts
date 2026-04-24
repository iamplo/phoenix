import { db } from "@phoenix/db";
import { NotFoundError, ValidationError } from "../lib/errors"
import type { CreateProjectBody } from "@phoenix/types";

type UpdateProjectInput = Record<string, unknown>

// Business rules, DB logic

export class ProjectService {
  public static async getAll() {
    const projects = db.selectFrom("projects");
    return projects.selectAll().execute();
  }

  public static async show(id: string) {
    const query = db.selectFrom("projects").where("id", "=", id);
    const project = await query.selectAll().executeTakeFirst();
    if (!project) {
      throw new NotFoundError("Project not found")
    }

    return project
  }

  public static async new(input: CreateProjectBody) {
    return db
      .insertInto("projects")
      .values(input as never)
      .returningAll()
      .executeTakeFirstOrThrow()
  }

  public static async edit(id: string, project: UpdateProjectInput) {
    if (!id) {
      throw new ValidationError("Project ID is required")
    }

    const updated = await db
      .updateTable("projects")
      .set(project as never)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst()

    if (!updated) {
      throw new NotFoundError("Project not found")
    }

    return updated
  }

  public static async delete(id: string) {
    if (!id) {
      throw new ValidationError("Project ID is required")
    }

    const deleted = await db
      .deleteFrom("projects")
      .where("id", "=", id)
      .returning(["id"])
      .executeTakeFirst()

    if (!deleted) {
      throw new NotFoundError("Project not found")
    }

    return deleted
  }

}