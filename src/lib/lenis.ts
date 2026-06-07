import type Lenis from "lenis";

// Referencia singleton a la instancia de Lenis para que otros componentes
// (ej. el header) puedan controlar el scroll suave.
let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
