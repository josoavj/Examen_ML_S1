import Link from "next/link";
import { PenLine, Settings, FileText, User } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <PenLine size={18} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white hidden sm:block">
            Mala<span className="text-blue-600 dark:text-blue-400">Gasy</span> Editor
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link href="/" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50 px-3 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
            <FileText size={16} />
            <span className="hidden sm:block">Documents</span>
          </Link>
          <Link href="/settings" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50 px-3 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
            <Settings size={16} />
            <span className="hidden sm:block">Paramètres</span>
          </Link>
          
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-2" />

          <button className="flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 p-1.5 pr-3 rounded-full border border-neutral-200 dark:border-neutral-800 transition-colors">
            <div className="w-7 h-7 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-neutral-500 dark:text-neutral-300">
              <User size={14} />
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hidden sm:block">Koto</span>
          </button>
        </nav>

      </div>
    </header>
  );
}
