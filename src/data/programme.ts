export type ProgrammeSlot = {
  id: string;
  time: string;
  title: string;
  description?: string;
  bullets?: string[];
  speakers?: string[];
  role?: string;
  kind: "session" | "break" | "panel" | "workshop";
};

export const programme: ProgrammeSlot[] = [
  {
    id: "accueil",
    time: "08h30 – 09h00",
    title: "Accueil & Networking",
    bullets: ["Enregistrement des participants", "Icebreaker et échanges"],
    kind: "break",
  },
  {
    id: "keynote",
    time: "09h00 – 09h30",
    title: "Keynote d’ouverture",
    description: "Le futur du développement logiciel est déjà là",
    bullets: [
      "Evolution des outils IA",
      "Passage du développeur classique à l’AI Engineer",
      "Impact sur les carrières et les entreprises",
    ],
    speakers: ["Régis K."],
    role: "Speaker",
    kind: "session",
  },
  {
    id: "demo",
    time: "09h30 – 10h15",
    title: "Démo Live",
    description: "Construire un produit de zéro avec Cursor",
    bullets: [
      "Génération d’une application complète",
      "Backend, Frontend, Documentation",
      "Tests automatisés",
    ],
    kind: "session",
  },
  {
    id: "panel",
    time: "10h15 – 11h00",
    title: "Panel d’experts",
    description: "Les développeurs seront-ils remplacés par l’IA ?",
    speakers: ["Ezéchiel A.", "Chaldrak D.", "Cissé T."],
    role: "Panélistes · Animateur : Obed A.",
    kind: "panel",
  },
  {
    id: "pause",
    time: "11h00 – 11h20",
    title: "Pause Networking",
    kind: "break",
  },
  {
    id: "avancee",
    time: "11h20 – 11h50",
    title: "Session avancée",
    description: "Comment les seniors utilisent réellement Cursor",
    bullets: [
      "Refactoring",
      "Architecture logicielle",
      "Revue de code",
      "Productivité d’équipe",
    ],
    speakers: ["M. Cissé"],
    role: "Animateur",
    kind: "session",
  },
  {
    id: "atelier",
    time: "11h50 – 12h35",
    title: "Atelier collaboratif",
    description: "Travail en groupe autour de cas réels",
    bullets: ["Fintech", "HealthTech", "EdTech", "Agritech"],
    speakers: ["Davy", "Régis", "Obed"],
    role: "Animateurs",
    kind: "workshop",
  },
  {
    id: "nouveautes",
    time: "12h35 – 12h55",
    title: "Nouveautés Cursor 2026",
    bullets: [
      "Agent Mode",
      "Background Agents",
      "MCP",
      "BugBot",
      "Rules & Skills",
      "Parallel Agents",
    ],
    speakers: ["Régis K."],
    role: "Animateur",
    kind: "session",
  },
  {
    id: "inspiration",
    time: "12h55 – 13h10",
    title: "Talk Inspiration",
    description:
      "Comment un développeur africain peut multiplier son impact grâce à l’IA",
    speakers: ["Brice G."],
    role: "Speaker",
    kind: "session",
  },
  {
    id: "communaute",
    time: "13h10 – 13h20",
    title: "Présentation de la communauté Cursor Bénin",
    bullets: [
      "Prochains événements",
      "Challenges communautaires",
      "Opportunités de collaboration",
      "Présentation de la core team",
    ],
    speakers: ["Davy A."],
    role: "Animateur",
    kind: "session",
  },
];
