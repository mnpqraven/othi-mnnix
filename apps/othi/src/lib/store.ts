import { useReducerAtom, useSetReducerAtom } from "@repo/lib/hooks";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import {
  type CommandAtomShape,
  commandCenterReducer,
  defaultCommandAtom,
} from "./commandCenterReducer";

export const commandAtom = atom<CommandAtomShape>(defaultCommandAtom);

export const useSetCommandReducer = () =>
  useSetReducerAtom(commandAtom, commandCenterReducer);
export const useCommandReducer = () =>
  useReducerAtom(commandAtom, commandCenterReducer);

export const commandSearchInputAtom = focusAtom(commandAtom, (optic) =>
  optic.prop("searchInput"),
);
commandSearchInputAtom.debugLabel = "commandSearchInputAtom";
