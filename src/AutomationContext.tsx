import { createContext, useContext } from "react";
import { AutomationState } from "./utils/types";

//////////////////////
// Context
//////////////////////
export const AutomationContext = createContext<AutomationState | null>(null);

export const useAutomationData = () => {
  const ctx = useContext(AutomationContext);
  if (!ctx) throw new Error("Must be used in provider");
  return ctx;
};
