import { atom } from "jotai";
import type { ArchivedSections } from "../orquestrator";
import { storage } from "../orquestrator/storage";
import { documentService } from "../orquestrator/document";
import { documentAtom } from "./document";

export type ViewMode = "active" | "archive";

// Clean up old archives (>1 week) on app load
const initialArchive: ArchivedSections = storage.cleanOldArchives();

export const archiveAtom = atom<ArchivedSections>(initialArchive);
export const viewModeAtom = atom<ViewMode>("active");

export const archiveSectionAtom = atom(
  null,
  (
    get,
    set,
    { startIndex, endIndex }: { startIndex: number; endIndex: number }
  ) => {
    const currentDoc = get(documentAtom);
    const { remaining, archived } = documentService.archiveSection(
      currentDoc,
      startIndex,
      endIndex
    );

    set(documentAtom, remaining);
    documentService.save(remaining);

    const updatedArchive = storage.addToArchive(archived);
    set(archiveAtom, updatedArchive);

    return archived.id;
  }
);

export const restoreSectionAtom = atom(
  null,
  (get, set, sectionId: string) => {
    const archive = get(archiveAtom);
    const section = archive.find((s) => s.id === sectionId);
    if (!section) return;

    const updatedArchive = archive.filter((s) => s.id !== sectionId);
    set(archiveAtom, updatedArchive);
    storage.setArchive(updatedArchive);

    const currentDoc = get(documentAtom);
    const restoredLines = section.lines.map((line) => ({
      ...line,
      updatedAt: Date.now(),
    }));

    // Check if doc already ends with empty line
    const endsWithEmpty = currentDoc.length > 0 && !currentDoc[currentDoc.length - 1].text.trim();

    // Only add beforeSeparator if doc has content AND doesn't already end with empty
    const beforeSeparator = currentDoc.length > 0 && !endsWithEmpty
      ? [{ id: crypto.randomUUID(), text: "", state: "TODO" as const, updatedAt: Date.now() }]
      : [];

    const afterSeparator = { id: crypto.randomUUID(), text: "", state: "TODO" as const, updatedAt: Date.now() };
    const newDoc = [...currentDoc, ...beforeSeparator, ...restoredLines, afterSeparator];
    set(documentAtom, newDoc);
    documentService.save(newDoc);
  }
);

export const deleteArchiveAtom = atom(
  null,
  (get, set, sectionId: string) => {
    const archive = get(archiveAtom);
    const updated = archive.filter((s) => s.id !== sectionId);
    set(archiveAtom, updated);
    storage.setArchive(updated);
  }
);
