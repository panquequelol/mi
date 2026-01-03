import { useMemo } from "react";
import type { Language } from "../orquestrator/types";

export type Translations = {
  // Archive view
  archiveNotice: string;
  archiveEmpty: string;
  restore: string;
  delete: string;
  nuke: string;
  nukeConfirm: string;

  // Settings
  size: string;
  light: string;
  dark: string;
  language: string;
  settingsHere: string;
  goBack: string;

  // Languages (for the selector)
  langEnglish: string;
  langSpanish: string;
  langJapanese: string;
  langChinese: string;

  // Empty state hint
  emptyHint: string;

  // Timestamps
  justNow: string;
  minsAgo: (mins: number) => string;
  hoursAgo: (hours: number) => string;
  daysAgo: (days: number) => string;
  yesterday: string;
  archivedJustNow: string;
  archivedMinsAgo: (mins: number) => string;
  archivedHoursAgo: (hours: number) => string;
  archivedDaysAgo: (days: number) => string;
  archivedYesterday: string;
  archivedDaysAgoPrefix: string;
};

export const translations: Record<Language, Translations> = {
  en: {
    archiveNotice: "archives are deleted after 7 days",
    archiveEmpty: "no archived sections yet",
    restore: "restore",
    delete: "delete",
    nuke: "nuke",
    nukeConfirm: "delete all archives? this cannot be undone",
    size: "size",
    light: "light",
    dark: "dark",
    language: "language",
    settingsHere: "settings here",
    goBack: "go back",
    langEnglish: "English",
    langSpanish: "Español (Spanish)",
    langJapanese: "日本語 (Japanese)",
    langChinese: "中文 (Chinese)",
    emptyHint: "type here. settings at",
    justNow: "now",
    minsAgo: (mins) => `${mins}m`,
    hoursAgo: (hours) => `${hours}h`,
    daysAgo: (days) => `${days}d`,
    yesterday: "1d",
    archivedJustNow: "now",
    archivedMinsAgo: (mins) => `${mins}m`,
    archivedHoursAgo: (hours) => `${hours}h`,
    archivedDaysAgo: (days) => `${days}d`,
    archivedYesterday: "1d",
    archivedDaysAgoPrefix: "",
  },
  es: {
    archiveNotice: "los archivos se eliminan después de 7 días",
    archiveEmpty: "no hay secciones archivadas aún",
    restore: "restaurar",
    delete: "eliminar",
    nuke: "eliminar todo",
    nukeConfirm: "¿eliminar todos los archivos? esto no se puede deshacer",
    size: "tamaño",
    light: "claro",
    dark: "oscuro",
    language: "idioma",
    settingsHere: "configuración aquí",
    goBack: "volver",
    langEnglish: "English (Inglés)",
    langSpanish: "Español",
    langJapanese: "日本語 (Japonés)",
    langChinese: "中文 (Chino)",
    emptyHint: "escribe aquí. configuración en",
    justNow: "ahora",
    minsAgo: (mins) => `${mins}m`,
    hoursAgo: (hours) => `${hours}h`,
    daysAgo: (days) => `${days}d`,
    yesterday: "1d",
    archivedJustNow: "ahora",
    archivedMinsAgo: (mins) => `${mins}m`,
    archivedHoursAgo: (hours) => `${hours}h`,
    archivedDaysAgo: (days) => `${days}d`,
    archivedYesterday: "1d",
    archivedDaysAgoPrefix: "",
  },
  ja: {
    archiveNotice: "アーカイブは7日後に削除されます",
    archiveEmpty: "アーカイブされたセクションはまだありません",
    restore: "復元",
    delete: "削除",
    nuke: "全削除",
    nukeConfirm: "すべてのアーカイブを削除しますか？これは元に戻せません",
    size: "サイズ",
    light: "ライト",
    dark: "ダーク",
    language: "言語",
    settingsHere: "設定はこちら",
    goBack: "戻る",
    langEnglish: "English (英語)",
    langSpanish: "Español (スペイン語)",
    langJapanese: "日本語",
    langChinese: "中文 (中国語)",
    emptyHint: "ここに入力。設定は",
    justNow: "今",
    minsAgo: (mins) => `${mins}分`,
    hoursAgo: (hours) => `${hours}時間`,
    daysAgo: (days) => `${days}日`,
    yesterday: "1日",
    archivedJustNow: "今",
    archivedMinsAgo: (mins) => `${mins}分`,
    archivedHoursAgo: (hours) => `${hours}時間`,
    archivedDaysAgo: (days) => `${days}日`,
    archivedYesterday: "1日",
    archivedDaysAgoPrefix: "",
  },
  zh: {
    archiveNotice: "存档将在7天后删除",
    archiveEmpty: "暂无存档部分",
    restore: "恢复",
    delete: "删除",
    nuke: "全部删除",
    nukeConfirm: "删除所有存档？此操作无法撤销",
    size: "大小",
    light: "浅色",
    dark: "深色",
    language: "语言",
    settingsHere: "设置在这里",
    goBack: "返回",
    langEnglish: "English (英语)",
    langSpanish: "Español (西班牙语)",
    langJapanese: "日本語 (日语)",
    langChinese: "中文",
    emptyHint: "在此输入。设置在",
    justNow: "刚刚",
    minsAgo: (mins) => `${mins}分钟`,
    hoursAgo: (hours) => `${hours}小时`,
    daysAgo: (days) => `${days}天`,
    yesterday: "1天",
    archivedJustNow: "刚刚",
    archivedMinsAgo: (mins) => `${mins}分钟`,
    archivedHoursAgo: (hours) => `${hours}小时`,
    archivedDaysAgo: (days) => `${days}天`,
    archivedYesterday: "1天",
    archivedDaysAgoPrefix: "",
  },
};

export const useTranslations = (language: Language): Translations => {
  return useMemo(() => translations[language], [language]);
};

// Language metadata for display
export const languages: Array<{ code: Language; nativeName: string; englishName: string }> = [
  { code: "en", nativeName: "English", englishName: "English" },
  { code: "es", nativeName: "Español", englishName: "Spanish" },
  { code: "ja", nativeName: "日本語", englishName: "Japanese" },
  { code: "zh", nativeName: "中文", englishName: "Chinese" },
];
