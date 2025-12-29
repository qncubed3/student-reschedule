import Link from "next/link";
import { Home } from "lucide-react";

export default function HomeButton() {
  return (
    <Link
      href="/dashboard"
      aria-label="Go to dashboard"
      className="p-2 rounded transition hover:text-gray-400"
    >
      <Home className="h-5 w-5" />
    </Link>
  );
}
