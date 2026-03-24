"use client";

import { useState } from "react";
import { Settings2, Bot, Languages, Check, Moon, Sun, Volume2, Globe } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  
  const [activeModules, setActiveModules] = useState<Record<string, boolean>>({
    spellcheck: true,
    grammar: true,
    lemma: false,
    autocomplete: true,
    translation: false,
    sentiment: true,
    tts: false,
    ner: true,
    chatbot: true,
  });

  const toggleModule = (key: string) => {
    setActiveModules(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      toast.success(newState[key] ? "Module activé" : "Module désactivé", {
        description: `Le paramètre a été mis à jour avec succès.`
      });
      return newState;
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`Mode ${newTheme === "dark" ? "Sombre" : "Clair"} activé`);
  };

  const MODULES = [
    { id: "spellcheck", name: "Correcteur orthographique", icon: <Check size={18} /> },
    { id: "grammar", name: "Règles linguistiques", icon: <Check size={18} /> },
    { id: "lemma", name: "Lemmatisation", icon: <Languages size={18} /> },
    { id: "autocomplete", name: "Autocomplétion (IA)", icon: <Bot size={18} /> },
    { id: "translation", name: "Traduction mot-à-mot", icon: <Globe size={18} /> },
    { id: "sentiment", name: "Analyse de sentiment", icon: <Bot size={18} /> },
    { id: "tts", name: "Text-to-Speech", icon: <Volume2 size={18} /> },
    { id: "chatbot", name: "Assistant Chatbot", icon: <Bot size={18} /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl flex-1 flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-neutral-900 dark:text-white">Paramètres de l'Éditeur</h1>
        <p className="text-neutral-500 dark:text-neutral-400">Configurez votre environnement de rédaction et les modules d'Intelligence Artificielle.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
        
        {/* Sidebar Settings */}
        <div className="space-y-2 md:col-span-1 border-r border-neutral-200 dark:border-neutral-800 pr-4">
          <button className="w-full text-left px-4 py-2.5 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 font-medium flex items-center gap-3">
            <Bot size={18} />
            Modules IA
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 font-medium flex items-center gap-3 transition-colors">
            <Settings2 size={18} />
            Préférences Générales
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 font-medium flex items-center gap-3 transition-colors">
            <Languages size={18} />
            Langue et Région
          </button>
          <button 
            onClick={toggleTheme}
            className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 font-medium flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              Apparence
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-500">
              {theme === "dark" ? "Sombre" : "Clair"}
            </span>
          </button>
        </div>

        {/* Content Settings */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-neutral-800 pb-2">Modules d'Assistance IA</h2>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Activez ou désactivez les différents modules spécialisés dans le traitement de la langue malagasy. Ces modules interviendront lors de la rédaction dans l'éditeur.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MODULES.map((mod) => (
                <div 
                  key={mod.id} 
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer",
                    activeModules[mod.id] 
                      ? "border-blue-500/50 bg-blue-500/5" 
                      : "border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 hover:border-neutral-700"
                  )}
                  onClick={() => toggleModule(mod.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      activeModules[mod.id] ? "bg-blue-500/20 text-blue-400" : "bg-neutral-800 text-neutral-400"
                    )}>
                      {mod.icon}
                    </div>
                    <span className={cn(
                      "font-medium text-sm",
                      activeModules[mod.id] ? "text-neutral-200" : "text-neutral-500"
                    )}>
                      {mod.name}
                    </span>
                  </div>
                  
                  {/* Fake Custom Toggle */}
                  <div className={cn(
                    "w-10 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out",
                    activeModules[mod.id] ? "bg-blue-600" : "bg-neutral-700"
                  )}>
                    <div className={cn(
                      "w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out",
                      activeModules[mod.id] ? "translate-x-4" : "translate-x-0"
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
