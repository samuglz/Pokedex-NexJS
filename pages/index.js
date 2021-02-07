import Head from "next/head";

import Header from "../components/Header";
import PokemonGallery from "../components/PokemonGallery";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pokedex App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-full py-4">
        <Header />
        <section className="mt-14 flex justify-center items-center px-2">
          <PokemonGallery />
        </section>
      </main>
    </div>
  );
}
