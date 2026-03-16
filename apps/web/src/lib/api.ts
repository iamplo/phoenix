import { hc } from 'hono/client'
import type { AppType } from '../../../api/src/index'
// Hono client setup to interact with the API server running on
// localhost:8787 for RPC calls from the web application.

export const client = hc<AppType>('http://localhost:8787')