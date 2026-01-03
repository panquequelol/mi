export type TodoState = "TODO" | "DONE";

export type TodoLine = {
  id: string;
  text: string;
  state: TodoState;
  updatedAt: number;
};

export type NotepadDocument = TodoLine[];

// Legacy storage key name preserved for backward compatibility with existing user data
// Project was originally called "nairobi-notepad" before being renamed to "Tripoli"
export const STORAGE_KEY = "nairobi-notepad";

export type ArchivedSection = {
  id: string;
  lines: TodoLine[];
  archivedAt: number;
};

export type ArchivedSections = ArchivedSection[];

// Legacy storage key name preserved for backward compatibility
export const ARCHIVE_STORAGE_KEY = "nairobi-notepad-archive";

export type DarkMode = "light" | "dark";
export type TextSizeProfile = "normal" | "lsize" | "xlsize" | "xxlsize";
export type Language = "en" | "es" | "ja" | "zh";

export type AppSettings = {
  darkMode: DarkMode;
  textSize: TextSizeProfile;
  language: Language;
};

// Legacy storage key name preserved for backward compatibility
export const SETTINGS_STORAGE_KEY = "nairobi-notepad-settings";
