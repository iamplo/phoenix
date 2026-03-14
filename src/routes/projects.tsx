import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: Projects,
  beforeLoad: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  loader: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
})

function Projects() {
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