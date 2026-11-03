import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ModelCreator } from "@/components/ModelCreator";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <Navbar />
      <Hero />
      <ModelCreator />
    </main>
  );
}
