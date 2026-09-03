import ServiceSearch from "@/components/ServiceSearch";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20">
        <div className="mb-10 max-w-3xl text-center">
          <p className="mb-4 text-lg font-semibold">
            🇰🇼 Kuwait Life
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Government services,
            <br />
            explained simply.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Find clear information about Kuwait government services,
            requirements, documents, fees, and official sources.
          </p>
        </div>

        <ServiceSearch />

        <p className="mt-12 max-w-2xl text-center text-xs leading-5 text-gray-500">
          Kuwait Life is an independent informational project and is not
          affiliated with the Government of Kuwait. Always verify information
          using the linked official government source.
        </p>
      </section>
    </main>
  );
}