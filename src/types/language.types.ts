export interface Language {
  id: number;
  name: string;
}

export interface LanguageSupportEntry {
  name: string;
  interface: boolean;
  fullAudio: boolean;
  subtitles: boolean;
}
