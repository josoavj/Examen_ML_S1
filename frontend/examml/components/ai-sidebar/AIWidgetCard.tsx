"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIWidgetCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  actionButton?: React.ReactNode;
}

export function AIWidgetCard({
  title,
  icon,
  children,
  defaultOpen = true,
  actionButton,
}: AIWidgetCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl overflow-hidden mb-4 shadow-sm transition-all">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-neutral-800/80 select-none transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <div className="text-blue-400">
            {icon}
          </div>
          <span className="font-semibold text-sm text-neutral-200">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {actionButton && (
            <div onClick={(e) => e.stopPropagation()}>
              {actionButton}
            </div>
          )}
          <button className="text-neutral-500 hover:text-white transition-colors">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/30 animate-in fade-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
