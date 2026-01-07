import React from "react";
import { LogoutButton } from "./logout-button";
import HomeButton from "./HomeButton";
export default function Header() {
  return (
    <header className="z-header bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 w-full shadow-md backdrop-blur">
      <div className="mx-auto flex h-auto flex-col items-center gap-2 px-2 sm:h-14 sm:flex-row sm:gap-0 sm:px-4">
        {/* Logo */}
        <HomeButton/>

        {/* Search */}
        <div className="order-2 flex-1 sm:absolute sm:left-1/2 sm:order-none sm:w-auto sm:-translate-x-1/2" data-onboarding="main-search">
          {/* Mobile Search */}
          <div className="sm:hidden">
            <button
              data-slot="button"
              className="inline-flex items-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer border hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-4 py-2 has-[>svg]:px-3 bg-muted/50 text-muted-foreground relative h-9 w-full justify-start rounded-lg text-sm font-normal shadow-none"
            >
              <span>Search the LMS...</span>
            </button>
          </div>

          {/* Desktop Search */}
          <div className="hidden sm:block">
            <button
              data-slot="button"
              className="inline-flex items-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-4 py-2 has-[>svg]:px-3 text-muted-foreground relative h-9 w-full cursor-pointer justify-start rounded-lg bg-white/50 text-sm font-normal shadow-none sm:pr-12 md:w-96 lg:w-96 xl:w-128 dark:text-white"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
            >
              <span className="hidden lg:inline-flex">Search the LMS...</span>
              <span className="inline-flex lg:hidden">Search...</span>
              <kbd className="dark:bg-brand-navy pointer-events-none absolute top-[0.45rem] right-[1rem] hidden h-5 items-center gap-1 rounded-lg border bg-white px-1.5 font-mono text-[10px] font-medium select-none sm:flex dark:text-white">
                <span className="text-xs">Ctrl+J</span>
              </kbd>
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="order-3 ml-auto flex items-center gap-2">
          <div className="flex items-center gap-3">
            {/* Example Button */}

            <LogoutButton/>
        
          </div>
        </div>
      </div>
    </header>
  );
}
