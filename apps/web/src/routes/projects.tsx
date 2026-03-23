import { client } from "#/lib/api";
import { createFileRoute } from '@tanstack/react-router'

//  Need to cast to a simplified typ
// const getData = createServerFn().handler(async () => {
//     const response = await client.api.v1.projects.$get()
//     console.log('Projects loader response:', response)
//     const { data } = await response.json()
//     return data as Projects[]
// })

export const Route = createFileRoute('/projects')({
  loader: async () => {
    const response = await client.api.v1.projects.$get()
    console.log('Projects loader response:', response)
    const data = await response.json()
    return data
  },
  // loader: () => getData(),
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
  const data = Route.useLoaderData()

  return (
    <div className="">
      <h1 className="">
        Projects
      </h1>
      <p className="">
        {data.data.length} projects found
      
      </p>
    </div>
  );
}