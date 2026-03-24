"use client";

import { useState } from "react";
import { Sparkles, Languages, CheckCircle, MessageSquare, GraduationCap, X } from "lucide-react";
import { AIWidgetCard } from "./AIWidgetCard";
import { MOCK_SPELLCHECKS, MOCK_GRAMMAR_RULES } from "@/lib/mock-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AISidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AISidebar({ isOpen, onClose }: AISidebarProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Manao ahoana ! Azoko hanampiana anao ve ?" }
  ]);

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    toast.info("Analyse du texte en cours...");
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success("Analyse terminée avec succès !");
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatHistory([...chatHistory, { role: "user", content: chatMessage }]);
    setChatMessage("");
    
    // Simulate response
    setTimeout(() => {
       setChatHistory(prev => [...prev, { 
         role: "assistant", 
         content: "Tsara izany ! Tokony hasiana teny manentana kely ve eto amin'ny fehezanteny farany ?" 
       }]);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <aside className="w-80 lg:w-96 flex-shrink-0 border-l border-neutral-800 bg-neutral-950 flex flex-col h-[calc(100vh-4rem)] sticky top-16 right-0 overflow-hidden transform transition-all duration-300">
      
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
        <div className="flex items-center gap-2 text-blue-400">
          <Sparkles size={20} />
          <h2 className="font-bold text-lg text-white">Assistant IA</h2>
        </div>
        <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Spell Check Widget */}
        <AIWidgetCard 
          title="Correction du texte" 
          icon={<CheckCircle size={18} />}
          actionButton={
            <button 
              onClick={handleAnalysis}
              disabled={isAnalyzing}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded shadow-sm disabled:opacity-50 transition-colors"
            >
              {isAnalyzing ? "..." : "Analyser"}
            </button>
          }
        >
          {isAnalyzing ? (
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-neutral-800 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-neutral-800 rounded animate-pulse" />
            </div>
          ) : (
            <div className="space-y-3">
              {MOCK_SPELLCHECKS.map((item, idx) => (
                <div key={idx} className="bg-neutral-950 border border-red-900/30 rounded-lg p-3">
                  <p className="text-xs text-neutral-400 mb-1 italic">"{item.context}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-red-400 font-medium line-through text-sm">{item.original}</span>
                      <span className="text-neutral-500">→</span>
                      <span className="text-green-400 font-medium text-sm">{item.suggestion}</span>
                    </div>
                    <button className="text-xs bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded text-neutral-300 transition-colors">
                      Appliquer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AIWidgetCard>

        {/* Grammar / Linguistic Rules Widget */}
        <AIWidgetCard title="Règles Linguistiques" icon={<GraduationCap size={18} />} defaultOpen={false}>
          <div className="space-y-3">
            {MOCK_GRAMMAR_RULES.map((rule, idx) => (
              <div key={idx} className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider block mb-1">
                  Alert
                </span>
                <p className="text-sm font-medium text-white mb-1">{rule.issue}</p>
                <p className="text-xs text-neutral-400">{rule.description}</p>
              </div>
            ))}
          </div>
        </AIWidgetCard>

        {/* Lemmatization Widget */}
        <AIWidgetCard title="Lemmatisation" icon={<Languages size={18} />} defaultOpen={false}>
           <div className="flex gap-2 mb-3">
             <input type="text" placeholder="Entrez un mot..." className="flex-1 bg-neutral-950 border border-neutral-800 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500" defaultValue="fanomezan-tsoa" />
             <button className="bg-neutral-800 hover:bg-neutral-700 px-3 rounded text-sm font-medium transition-colors">Chercher</button>
           </div>
           <div className="bg-neutral-950 border border-neutral-800 rounded p-3">
              <p className="text-xs text-neutral-500 mb-1">Racine identifiée :</p>
              <p className="font-mono text-blue-400 font-medium tracking-wide">ome</p>
              <div className="mt-2 text-xs text-neutral-400 bg-neutral-900 p-2 rounded">
                 Préfixe: <span className="text-emerald-400">fan-</span> <br/>
                 Suffixe: <span className="text-emerald-400">-zana</span>
              </div>
           </div>
        </AIWidgetCard>
        
        {/* Chatbot Widget */}
        <AIWidgetCard title="Assistant Chatbot" icon={<MessageSquare size={18} />}>
          <div className="flex flex-col h-64 bg-neutral-950 rounded-lg border border-neutral-800 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                    msg.role === 'user' ? "bg-blue-600 text-white" : "bg-neutral-800 text-neutral-200"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="border-t border-neutral-800 p-2 flex gap-2">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Posez une question..."
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded flex items-center justify-center transition-colors">
                <MessageSquare size={14} />
              </button>
            </form>
          </div>
        </AIWidgetCard>

      </div>
    </aside>
  );
}
