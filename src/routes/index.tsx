import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section>
        <p className="island-kicker mb-3">Paragraph</p>
        <h1 className="">
          Heading
        </h1>
        <p className="">
          Pargraph
        </p>
      </section>

      <section className="">Section</section>

      <section className="">
        Section
  
      </section>
    </main>
  );
}
