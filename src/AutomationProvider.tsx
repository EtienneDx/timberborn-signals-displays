import React, { useState, useEffect } from "react";
import { AutomationContext } from "./AutomationContext";
import { MAX_SAMPLES, REFRESH_INTERVAL } from "./constants";
import { GraphInfo, Weather, Adapter } from "./utils/types";
import { parseAdapters } from "./utils/parseAdapters";

//////////////////////
// Provider
//////////////////////
export const AutomationProvider: React.FC<{ children: React.ReactNode; }> = ({
  children,
}) => {
  const [graphs, setGraphs] = useState<Record<string, GraphInfo>>({});
  const [signals, setSignals] = useState<Record<string, boolean>>({});
  const [weather, setWeather] = useState<Weather>(Weather.Missing);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/adapters");
        const adapters: Adapter[] = await res.json();

        const parsed = parseAdapters(adapters);

        setSignals(parsed.signals);
        setWeather(parsed.weather);

        setGraphs((prev) => {
          const next = { ...prev };
          const now = Date.now();

          Object.entries(parsed.graphBuckets).forEach(([name, entries]) => {
            const thresholds = entries.map((e) => e.threshold);

            const highestTrue = entries
              .filter((e) => e.state)
              .map((e) => e.threshold)
              .sort((a, b) => b - a)[0] ?? 0;

            const percentage = entries.some((e) => e.percentage);

            if (!next[name]) {
              next[name] = {
                points: [],
                thresholds,
                percentage,
              };
            }

            const g = next[name];

            g.thresholds = thresholds;
            g.percentage = percentage;

            g.points = [...g.points, { time: now, value: highestTrue }].slice(
              -MAX_SAMPLES
            );
          });

          return { ...next };
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const id = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <AutomationContext.Provider value={{ graphs, signals, weather }}>
      {children}
    </AutomationContext.Provider>
  );
};
