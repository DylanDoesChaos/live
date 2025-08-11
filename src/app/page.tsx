import Link from "next/link";

export default function HomePage() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Dylan Does Chaos
      </h1>
      <ol>
        <li>
          <Link href="/backdrop" className="text-sky-600 underline">
            Backdrop
          </Link>
        </li>
        <ol className="pl-4">
          <li>
            <Link
              href="/backdrop?variant=start"
              className="text-sky-600 underline"
            >
              Start Screen
            </Link>
          </li>
          <li>
            <Link
              href="/backdrop?variant=camera"
              className="text-sky-600 underline"
            >
              Face Cam
            </Link>
          </li>
        </ol>
        <li>
          <Link href="/chat" className="text-sky-600 underline">
            Chat
          </Link>
        </li>
      </ol>
    </div>
  );
}
