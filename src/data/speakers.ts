export type Speaker = {
  id: string;
  name: string;
  roleLabel: string;
  title: string;
  subtitle?: string;
  photo: string;
  featured?: boolean;
};

/** Placeholders — remplacer par vraies photos plus tard */
export const speakers: Speaker[] = [
  {
    id: "obed",
    name: "Obed S. AGBOHOUN",
    roleLabel: "Animateur",
    title: "Développeur full-stack",
    subtitle: "Ambassadeur fata & lead TCC UAC",
    photo: "https://picsum.photos/seed/cursor-obed/640/800",
    featured: true,
  },
  {
    id: "regis",
    name: "Régis K.",
    roleLabel: "Speaker",
    title: "Keynote & Nouveautés Cursor",
    photo: "https://picsum.photos/seed/cursor-regis/640/800",
  },
  {
    id: "ezechiel",
    name: "Ezéchiel A.",
    roleLabel: "Panéliste",
    title: "Expert technique",
    photo: "https://picsum.photos/seed/cursor-ezechiel/640/800",
  },
  {
    id: "chaldrak",
    name: "Chaldrak D.",
    roleLabel: "Panéliste",
    title: "Développeur senior",
    photo: "https://picsum.photos/seed/cursor-chaldrak/640/800",
  },
  {
    id: "cisse",
    name: "Cissé T.",
    roleLabel: "Panéliste",
    title: "Session avancée Cursor",
    photo: "https://picsum.photos/seed/cursor-cisse/640/800",
  },
  {
    id: "davy",
    name: "Davy A.",
    roleLabel: "Animateur",
    title: "Communauté Cursor Bénin",
    photo: "https://picsum.photos/seed/cursor-davy/640/800",
  },
  {
    id: "brice",
    name: "Brice G.",
    roleLabel: "Speaker",
    title: "Talk Inspiration",
    photo: "https://picsum.photos/seed/cursor-brice/640/800",
  },
];
