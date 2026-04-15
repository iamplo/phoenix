import type { MiddlewareHandler } from "hono"
import { cors } from "hono/cors"

export const apiHeaders: MiddlewareHandler = cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
})
