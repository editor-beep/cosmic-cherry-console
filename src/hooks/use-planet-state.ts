import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPlanetState } from "@/lib/planet.functions";
import { supabase } from "@/integrations/supabase/client";

export function usePlanetState() {
  const fetchPlanet = useServerFn(getPlanetState);
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["planet"],
    queryFn: () => fetchPlanet(),
    refetchInterval: 15000,
  });

  useEffect(() => {
    const ch = supabase
      .channel("planet-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "planet_state" }, () => {
        qc.invalidateQueries({ queryKey: ["planet"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [qc]);

  return q;
}
