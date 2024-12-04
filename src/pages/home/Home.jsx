import { BackgroundLines } from "../../components/ui/background-lines";

export function Home() {
  return (
    (<BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2
        className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-6 relative z-20 font-bold tracking-tight">
        Talk to your Loved Ones, Make Friends!
      </h2>
      <p
        className="max-w-3xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Connect, chat, and explore endless conversations on our vibrant and
        welcoming platform!
      </p>
    </BackgroundLines>)
  );
}
