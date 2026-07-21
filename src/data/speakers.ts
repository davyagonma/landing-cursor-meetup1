/**
 * Flyers designer pour animateurs / speakers / panélistes.
 * Pour l’instant : même placeholder `flyer-animateur.jpg` pour tous.
 * Remplacer `flyerSrc` par le fichier designer dès réception
 * (ex. `/speakers/obed-agbohoun.jpg`).
 */
export type SpeakerFlyer = {
  id: string;
  name: string;
  roleLabel: string;
  /** Chemin public vers le flyer JPG/PNG fourni par le designer */
  flyerSrc: string;
};

export const PLACEHOLDER_ANIMATEUR_FLYER = "/templates/flyer-animateur.jpg";

export const speakerFlyers: SpeakerFlyer[] = [
  {
    id: "obed",
    name: "Obed S. AGBOHOUN",
    roleLabel: "Animateur",
    flyerSrc: PLACEHOLDER_ANIMATEUR_FLYER,
  },
  {
    id: "regis",
    name: "Régis K.",
    roleLabel: "Speaker",
    flyerSrc: PLACEHOLDER_ANIMATEUR_FLYER,
  },
  {
    id: "ezechiel",
    name: "Ezéchiel A.",
    roleLabel: "Panéliste",
    flyerSrc: PLACEHOLDER_ANIMATEUR_FLYER,
  },
  {
    id: "chaldrak",
    name: "Chaldrak D.",
    roleLabel: "Panéliste",
    flyerSrc: PLACEHOLDER_ANIMATEUR_FLYER,
  },
  {
    id: "cisse",
    name: "Cissé T.",
    roleLabel: "Panéliste",
    flyerSrc: PLACEHOLDER_ANIMATEUR_FLYER,
  },
  {
    id: "davy",
    name: "Davy A.",
    roleLabel: "Animateur",
    flyerSrc: PLACEHOLDER_ANIMATEUR_FLYER,
  },
  {
    id: "brice",
    name: "Brice G.",
    roleLabel: "Speaker",
    flyerSrc: PLACEHOLDER_ANIMATEUR_FLYER,
  },
];

/** @deprecated Ancien modèle carte générée — conservé pour référence */
export type Speaker = {
  id: string;
  name: string;
  roleLabel: string;
  title: string;
  subtitle?: string;
  photo: string;
  featured?: boolean;
};

/** @deprecated */
export const speakers: Speaker[] = [];
