"use client";

import { useState, use, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { Save, Download, PanelRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { TipTapEditor } from "@/components/editor/TipTapEditor";
import { AISidebar } from "@/components/ai-sidebar/AISidebar";
import { storage } from "@/lib/storage";

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [docTitle, setDocTitle] = useState(id === "new" ? "Nouveau document" : "Chargement...");
  const [isLoaded, setIsLoaded] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Rédigez votre texte malagasy ici...",
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && !isLoaded) {
      if (id !== "new") {
        const doc = storage.getDocument(id);
        if (doc) {
          setDocTitle(doc.title);
          editor.commands.setContent(doc.content);
        } else {
          toast.error("Document introuvable");
        }
      } else {
        setDocTitle("Nouveau document");
      }
      setIsLoaded(true);
    }
  }, [editor, id, isLoaded]);

  const handleSave = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const plainText = editor.getText();
    const excerpt = plainText.length > 0 ? plainText.substring(0, 120) + "..." : "Document vide...";
    
    // Simple id generation if new
    const saveId = id === "new" ? Date.now().toString() : id;
    
    storage.saveDocument(saveId, docTitle, content, excerpt);
    toast.success("Document enregistré avec succès !");

    if (id === "new") {
      window.history.replaceState(null, '', `/editor/${saveId}`);
    }
  };

  const handleExport = () => {
    toast.success("Exportation PDF lancée !");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* Editor Top Bar */}
      <div className="h-14 border-b border-neutral-800 bg-neutral-950/80 flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <input 
            type="text" 
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            className="bg-transparent text-lg font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-2 py-1 min-w-[200px]"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors mr-2"
            >
              <PanelRight size={16} />
              IA Globale
            </button>
          )}

          <button 
            onClick={handleExport}
            className="flex items-center gap-2 border border-neutral-700 hover:bg-neutral-800 text-neutral-200 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Exporter</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            <Save size={16} />
            <span className="hidden sm:inline">Enregistrer</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 transition-all duration-300">
           {/* We pass the editor to the wrapper */}
           <TipTapEditor editor={editor} />
        </div>
        
        {/* Sidebar Space */}
        <AISidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
    </div>
  );
}
