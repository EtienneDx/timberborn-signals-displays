import React, { useState, useEffect } from "react";
import { AutomationContext } from "./AutomationContext";
import { MAX_SAMPLES, REFRESH_INTERVAL } from "./constants";
import { GraphInfo, Weather, Adapter, ApiError } from "./utils/types";
import { parseAdapters } from "./utils/parseAdapters";

export const AutomationProvider: React.FC<{ children: React.ReactNode; }> = ({
  children,
}) => {
  const [graphs, setGraphs] = useState<Record<string, GraphInfo>>({});
  const [signals, setSignals] = useState<Record<string, boolean>>({});
  const [weather, setWeather] = useState<Weather>(Weather.Missing);
  const [hour, setHour] = useState<number | undefined>(undefined);
  const [day, setDay] = useState<number | undefined>(undefined);
  const [cycle, setCycle] = useState<number | undefined>(undefined);
  const [error, setError] = useState<ApiError | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/adapters");
        if (res.status === 404) {
          setError(ApiError.NOT_FOUND);
          return;
        }
        if (!res.ok) {
          // In browsers a CORS failure or opaque response often shows up as status 0 or type "opaque"
          if (res.type === "opaque" || res.status === 0) {
            setError(ApiError.CORS);
          } else {
            setError(ApiError.UNKNOWN);
          }
          return;
        }
        const adapters: Adapter[] = await res.json();

        const parsed = parseAdapters(adapters);

        setSignals(parsed.signals);
        setWeather(parsed.weather);
        setHour(parsed.hour);
        setDay(parsed.day);
        setCycle(parsed.cycle);

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

        setError(undefined);
      }
      catch (err) {
        const anyErr = err as any;
        console.error("Error fetching data:", err, anyErr.message, anyErr.type, anyErr.code);

        // If connection was refused (Node or platform error), treat as NOT_FOUND
        if (
          anyErr?.code === "Failed to fetch" ||
          (anyErr?.message && typeof anyErr.message === "string" && anyErr.message.includes("Failed to fetch")) ||
          (err instanceof TypeError && typeof (err as any).message === "string" && (err as any).message.includes("Failed to fetch"))
        ) {
          setError(ApiError.NOT_FOUND);
        } else {
          setError(ApiError.UNKNOWN);
        }
      }
    };
    fetchData();
    const id = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <AutomationContext.Provider value={{ graphs, signals, weather, hour, day, cycle, error }}>
      {children}
    </AutomationContext.Provider>
  );
};
