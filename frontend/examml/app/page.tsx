"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, FileText, Search, Activity, Sparkles, Clock, Trash2 } from "lucide-react";
import { storage, type DocumentData } from "@/lib/storage";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return `il y a ${Math.floor(interval)} ans`;
  interval = seconds / 2592000;
  if (interval > 1) return `il y a ${Math.floor(interval)} mois`;
  interval = seconds / 86400;
  if (interval > 1) return `il y a ${Math.floor(interval)} jours`;
  interval = seconds / 3600;
  if (interval > 1) return `il y a ${Math.floor(interval)} heures`;
  interval = seconds / 60;
  if (interval >= 1) return `il y a ${Math.floor(interval)} minutes`;
  return `à l'instant`;
}

export default function Dashboard() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setDocuments(storage.getDocuments());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevent navigating to the editor
    storage.deleteDocument(id);
    setDocuments(storage.getDocuments());
  };

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Bienvenue, Koto</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Voici un aperçu de vos documents et de votre activité.</p>
        </div>
        <Link 
          href="/editor/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} />
          Nouveau Document
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">Total Documents</p>
            <h3 className="text-2xl font-bold mt-1 text-neutral-900 dark:text-white">{documents.length}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">Corrections IA</p>
            <h3 className="text-2xl font-bold mt-1 text-neutral-900 dark:text-white">1,204</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">Mots Écrits</p>
            <h3 className="text-2xl font-bold mt-1 text-neutral-900 dark:text-white">45.2k</h3>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
            <Clock size={20} className="text-neutral-400" />
            VOS DOCUMENTS
          </h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un document..." 
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-neutral-900 dark:text-white"
            />
          </div>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            Aucun document trouvé.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <Link 
                key={doc.id} 
                href={`/editor/${doc.id}`}
                className="group block bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-colors">
                    <FileText size={20} />
                  </div>
                  <button 
                    onClick={(e) => handleDelete(e, doc.id)}
                    className="text-neutral-400 hover:text-red-500 p-2 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors line-clamp-1">{doc.title}</h3>
                <p className="text-neutral-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                  {doc.excerpt}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-600 font-medium uppercase tracking-wider">
                  Modifié {timeAgo(doc.updatedAt)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
