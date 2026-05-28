import { useSyncExternalStore } from "react";

export type ResourceType = "juice" | "crust" | "pit";

export interface Harvest {
  id: string;
  resource_type: ResourceType;
  amount: number;
  extracted_at: string;
}

export interface PlanetState {
  syrup_pressure: number;
  total_juice: number;
  total_crust: number;
  total_pit: number;
  updated_at: string;
  harvests: Harvest[];
}

const KEY = "planetary-harvester:v1";

const initial = (): PlanetState => ({
  syrup_pressure: 420,
  total_juice: 0,
  total_crust: 0,
  total_pit: 0,
  updated_at: new Date().toISOString(),
  harvests: [],
});

function load(): PlanetState {
  if (typeof window === "undefined") return initial();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial();
    return { ...initial(), ...JSON.parse(raw) };
  } catch {
    return initial();
  }
}

let state: PlanetState = load();
const listeners = new Set<() => void>();

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; }
function getSnapshot() { return state; }
function getServerSnapshot() { return initial(); }

const DELTA = { juice: 1.5, crust: -0.8, pit: 0.4 } as const;

export const planetStore = {
  extract(resource_type: ResourceType, amount: number) {
    const delta = DELTA[resource_type] * amount;
    state = {
      ...state,
      syrup_pressure: Math.max(0, Math.min(1000, state.syrup_pressure + delta)),
      total_juice: state.total_juice + (resource_type === "juice" ? amount : 0),
      total_crust: state.total_crust + (resource_type === "crust" ? amount : 0),
      total_pit: state.total_pit + (resource_type === "pit" ? amount : 0),
      updated_at: new Date().toISOString(),
      harvests: [
        { id: crypto.randomUUID(), resource_type, amount, extracted_at: new Date().toISOString() },
        ...state.harvests,
      ].slice(0, 50),
    };
    persist();
  },
  reset() {
    state = initial();
    persist();
  },
};

export function usePlanetStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
