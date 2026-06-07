"use client";

import { createContext, useContext } from "react";

/**
 * Indica si el preloader terminó y los assets críticos están listos.
 * Las secciones usan este valor para lanzar sus animaciones de entrada.
 */
export const AppReadyContext = createContext(false);

export function useAppReady() {
  return useContext(AppReadyContext);
}
