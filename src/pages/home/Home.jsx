import { BackgroundLines } from "../../components/ui/background-lines";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/register");
  };

  return (
    (<BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2
        className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-6 relative z-20 font-bold tracking-tight">
        Instant Messaging, Endless Connections
      </h2>
      <p
        className="max-w-3xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Connect, chat, and explore endless conversations on our vibrant and
        welcoming platform!
      </p>
      <button className="mt-6 bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-semibold leading-6  text-white inline-block" onClick={handleJoinClick}>
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1 px-4 ring-1 ring-white/10 ">
          <span>
          Join the Conversation!
          </span>
          <svg
            fill="none"
            height="16"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.75 8.75L14.25 12L10.75 15.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-primary-a40 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>
    </BackgroundLines>)
  );
}

