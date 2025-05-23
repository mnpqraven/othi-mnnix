import { generateUlid } from "@repo/lib";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const editorTempBlogIdAtom = atomWithReset<string | undefined>(
  undefined,
);

export const generateEditorTempBlogIdAtom = atom(null, (_, set) => {
  const newId = generateUlid();
  set(editorTempBlogIdAtom, newId);
});

export const editorHelpDialogOpen = atom(false);
