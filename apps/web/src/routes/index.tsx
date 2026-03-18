import { client } from "#/lib/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async () => {
    const response = await client.api.v1.health.$get()
    const data = await response.json()
    return data
  },
  component: App,
});

function App() {
  const data = Route.useLoaderData();

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section>
        <p className="island-kicker mb-3">Paragraph</p>
        <h1 className="">Heading</h1>
        <p className="">Pargraph</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>

      <section className="">Section</section>

      <section className="">Section</section>
    </main>
  );
}
