// Types
export interface Document {
  id: string;
  title: string;
  updatedAt: Date;
  excerpt: string;
}

export interface SpellCheckSuggestion {
  original: string;
  suggestion: string;
  context: string;
}

// Mock Documents
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    title: "Kabary mariazy (Discours de mariage)",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    excerpt: "Tompoko, tonga eto amin'ity toerana ity izahay androany...",
  },
  {
    id: "doc-2",
    title: "Famintinana ny bokin'i Dox",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    excerpt: "Ny tononkalo nosoratan'i Dox dia naneho ny fihetseham-po...",
  },
  {
    id: "doc-3",
    title: "Raportan'ny tetikasa Fambolena",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    excerpt: "Nandritra ny volana lasa teo, ny tetikasa fambolena...",
  },
];

export const MOCK_SPELLCHECKS: SpellCheckSuggestion[] = [
  {
    original: "tsika",
    suggestion: "Isika",
    context: "...ary tsika rehetra eto..."
  },
  {
    original: "mboka",
    suggestion: "mbola",
    context: "...raha mboka misy ny fotoana..."
  }
];

export const MOCK_CHATBOT_HISTORY = [
  {
    role: "assistant",
    content: "Manao ahoana, inona no azoko hanampiana anao amin'ny fanoratana anio?"
  }
];

export const MOCK_GRAMMAR_RULES = [
  {
    issue: "Utilisation du trait d'union manquante",
    description: "Les verbes composés malgaches nécessitent souvent un trait d'union. Ex: 'Anio-kely' au lieu de 'Anio kely'.",
    severity: "warning"
  }
];
