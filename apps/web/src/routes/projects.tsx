import { client } from "#/lib/api";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  loader: async () => {
    const response = await client.api.v1.projects.$get()
    const data = await response.json()
    return data
  },
  component: Projects,
  // beforeLoad: () => {
  //   console.log('Executes on the server during the initial request')
  //   console.log('Executes on the client for subsequent navigation')
  // },
  // loader: () => {
  //   console.log('Executes on the server during the initial request')
  //   console.log('Executes on the client for subsequent navigation')
  // },
})

function Projects() {
  // const { data } = Route.useLoaderData()

  return (
    <div className="">
      <h1 className="">
        Projects
      </h1>
      <p className="">
        par
      </p>
    </div>
  );
}