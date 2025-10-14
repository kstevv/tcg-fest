export type Session = {
  id: string; title: string; track: "MTG"|"Pokemon"|"YGO"|"Lorcana"|"General";
  start: string; end: string; location: string; description?: string; speakerIds?: string[]; day: "Fri"|"Sat"|"Sun";
};
export type Speaker = {
  id: string;
  name: string;
  /** Company/organization shown in ALL CAPS (e.g., "BINANCE") */
  org?: string;
  /** Person's role/title (e.g., "CEO") */
  title?: string;
  /** Public path under /public (e.g., "/speakers/richard-teng.jpg") */
  image: string;
  /** Optional links for social icons in the card header */
  socials?: { x?: string; linkedin?: string; website?: string };
  /** Optional short bio if you want it elsewhere */
  bio?: string;
};
export type Vendor = { id: string; name: string; booth: string; url?: string; logo?: string; categories?: string[] };
export type Tournament = { id: string; game: "MTG"|"Pokemon"|"YGO"|"Lorcana"; title: string; day: "Fri"|"Sat"|"Sun"; start: string; rulesUrl?: string; regUrl?: string; prizes?: string[]; cap?: number; };
