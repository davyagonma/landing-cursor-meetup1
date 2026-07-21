export const event = {
  name: "Cursor Bénin Meetup 2026",
  shortName: "Cursor Bénin",
  theme: "Comment les Agents IA transforment notre façon de construire des produits ?",
  panelTheme: "Les développeurs seront-ils remplacés par l’IA ?",
  dateLabel: "25 Juillet 2026",
  dateShort: { month: "Juil.", day: "25", year: "2026" },
  timeLabel: "8h30 à 13h00 GMT+1",
  location: "SOROC ZOGBO",
  lumaUrl:
    process.env.NEXT_PUBLIC_LUMA_URL ?? "https://luma.com/cursor-benin-meetup",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "#",
  community: "Cursor Community Bénin",
} as const;
