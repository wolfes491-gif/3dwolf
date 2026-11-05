import { Hero } from "@/components/Hero";
import { ModelCreator } from "@/components/ModelCreator";

export default function Home() {
  return (
    <main className="relative flex-1 bg-black text-white selection:bg-cyan-500 selection:text-black">
      <Hero />
      <ModelCreator />
    </main>
  );
}
