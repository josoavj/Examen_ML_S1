import { MOCK_DOCUMENTS } from "./mock-data";

export interface DocumentData {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  excerpt: string;
}

const STORAGE_KEY = "examml_documents";

export const storage = {
  getDocuments: (): DocumentData[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const initial = MOCK_DOCUMENTS.map(doc => ({
        ...doc,
        content: "<p>Contenu vierge ou simulé initialement...</p>",
        updatedAt: doc.updatedAt.toISOString(),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial as DocumentData[];
    }
    return JSON.parse(data);
  },

  getDocument: (id: string): DocumentData | null => {
    const docs = storage.getDocuments();
    return docs.find(doc => doc.id === id) || null;
  },

  saveDocument: (id: string, title: string, content: string, excerpt: string): void => {
    const docs = storage.getDocuments();
    const existingIndex = docs.findIndex(doc => doc.id === id);
    
    const docData: DocumentData = {
      id,
      title,
      content,
      excerpt,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      docs[existingIndex] = docData;
    } else {
      docs.unshift(docData);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  },

  deleteDocument: (id: string): void => {
    const docs = storage.getDocuments();
    const newDocs = docs.filter(doc => doc.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDocs));
  }
};
