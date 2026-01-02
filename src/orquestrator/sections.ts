import type { NotepadDocument, TodoLine } from "./types";

export type Section = {
  startIndex: number;
  endIndex: number;
  lines: TodoLine[];
  isComplete: boolean;
};

export function getSections(document: NotepadDocument): Section[] {
  const sections: Section[] = [];
  let currentStart = 0;

  for (let i = 0; i <= document.length; i++) {
    const isEnd = i === document.length;
    const isEmptyLine = !isEnd && !document[i].text.trim();

    if (isEnd || isEmptyLine) {
      if (i > currentStart) {
        const lines = document.slice(currentStart, i);
        const isComplete = lines.every((line) => line.state === "DONE");
        sections.push({
          startIndex: currentStart,
          endIndex: i,
          lines,
          isComplete,
        });
      }
      currentStart = i + 1;
    }
  }

  return sections;
}

export function getSectionForLine(
  document: NotepadDocument,
  lineIndex: number
): Section | null {
  const sections = getSections(document);
  return (
    sections.find((s) => lineIndex >= s.startIndex && lineIndex < s.endIndex) ||
    null
  );
}

export function getCompletedSections(document: NotepadDocument): Section[] {
  return getSections(document).filter((s) => s.isComplete && s.lines.length > 0);
}
