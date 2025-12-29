import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasEnvVars() {
  const { NEXT_PUBLIC_URL, NEXT_PUBLIC_API_KEY } = process.env;
  return NEXT_PUBLIC_URL && NEXT_PUBLIC_API_KEY;
}
