import { Adapter, Weather } from "./types";

//////////////////////
// Parsing
//////////////////////
const GRAPH_REGEX = /^(.+?)\s*>\s*(\d+)(%)?$/;
export function parseAdapters(adapters: Adapter[]) {
  const signals: Record<string, boolean> = {};
  const graphBuckets: Record<
    string, { threshold: number; state: boolean; percentage: boolean; }[]
  > = {};

  let drought: boolean | undefined;
  let badtide: boolean | undefined;

  adapters.forEach((a) => {
    if (a.name === "WEATHER DROUGHT") {
      drought = a.state;
      return;
    }

    if (a.name === "WEATHER BADTIDE") {
      badtide = a.state;
      return;
    }

    const m = a.name.match(GRAPH_REGEX);

    if (!m) {
      signals[a.name] = a.state;
      return;
    }

    const [, prefix, value, percent] = m;

    if (!graphBuckets[prefix]) graphBuckets[prefix] = [];

    graphBuckets[prefix].push({
      threshold: parseInt(value),
      state: a.state,
      percentage: !!percent,
    });
  });

  let weather = Weather.Missing;

  if (drought !== undefined && badtide !== undefined) {
    if (drought && badtide) weather = Weather.Error;
    else if (drought) weather = Weather.Drought;
    else if (badtide) weather = Weather.Badtide;
    else weather = Weather.Sunny;
  }

  return { signals, graphBuckets, weather };
}
