import { usePlanetStore } from "./use-planet-store";

// Compatibility shim: components used to read `data` from a query.
export function usePlanetState() {
  const data = usePlanetStore();
  return { data };
}
