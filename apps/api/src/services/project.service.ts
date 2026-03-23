import { db } from "@phoenix/db";

export const projectService = {
  getAll: async () => {
    const projects = db.selectFrom("projects");
    return projects.selectAll().execute();
  },
  show: async (id: string) => {
    const query = db.selectFrom("projects").where("id", "=", id);
    return query.selectAll().executeTakeFirst();
  },
  new: async ({}) => {
    // Insert a new Project into DB
    return {};
  },
  edit: async (id: string) => {
    // Edit a Project in DB
    return id;
  },
};
