import { Adapter, Weather } from "./types";

const GRAPH_REGEX = /^(.+?)\s*>\s*(\d+\.?\d*)(%)?$/;
const HOUR_REGEX = /^HOUR\s*([0-4])(N?)$/;
const DAY_REGEX = /^DAY\s*(\d+)(N?)$/;
const CYCLE_REGEX = /^CYCLE\s*(\d+)(N?)$/;

interface ParsedAdapters {
  signals: Record<string, boolean>;
  graphBuckets: Record<string, { threshold: number; state: boolean; percentage: boolean; }[]>;
  weather: Weather;
  hour?: number;
  day?: number;
  cycle?: number;
}

export function parseAdapters(adapters: Adapter[]): ParsedAdapters {
  const signals: Record<string, boolean> = {};
  const graphBuckets: Record<
    string, { threshold: number; state: boolean; percentage: boolean; }[]
  > = {};

  let drought: boolean | undefined;
  let badtide: boolean | undefined;
  let hour_bits: number[] = [];
  let day_bits: number[] = [];
  let cycle_bits: number[] = [];

  adapters.forEach((a) => {
    if (a.name === "WEATHER DROUGHT") {
      drought = a.state;
      return;
    }

    if (a.name === "WEATHER BADTIDE") {
      badtide = a.state;
      return;
    }

    // Try to parse the graph information from the adapter
    const graph = tryParseGraph(a);

    if (graph) {
      const { prefix } = graph;
      if (!graphBuckets[prefix]) graphBuckets[prefix] = [];
      graphBuckets[prefix].push({
        threshold: graph.value,
        state: a.state,
        percentage: graph.percentage,
      });

      return;
    }

    // Try to parse hour information from the adapter
    const hour = tryParseHour(a);
    if (hour) {
      hour_bits[hour.bit_position] = hour.state ? 1 : 0;
      return;
    }

    // Try to parse day information from the adapter
    const day = tryParseDay(a);
    if (day) {
      day_bits[day.bit_position] = day.state ? 1 : 0;
      return;
    }

    // Try to parse cycle information from the adapter
    const cycle = tryParseCycle(a);
    if (cycle) {
      cycle_bits[cycle.bit_position] = cycle.state ? 1 : 0;
      return;
    }

    // Default signal
    signals[a.name] = a.state;
  });

  let weather = Weather.Missing;

  if (drought !== undefined && badtide !== undefined) {
    if (drought && badtide) weather = Weather.Error;
    else if (drought) weather = Weather.Drought;
    else if (badtide) weather = Weather.Badtide;
    else weather = Weather.Sunny;
  }

  return {
    signals,
    graphBuckets,
    weather,
    hour: hour_bits.length > 0 ? hour_bits.reduce((acc, bit, idx) => acc | (bit << idx), 0) : undefined,
    day: day_bits.length > 0 ? day_bits.reduce((acc, bit, idx) => acc | (bit << idx), 0) : undefined,
    cycle: cycle_bits.length > 0 ? cycle_bits.reduce((acc, bit, idx) => acc | (bit << idx), 0) : undefined,
  };
}

function tryParseGraph(a: Adapter) {
  const m = a.name.match(GRAPH_REGEX);
  if (!m) return null;

  const [, prefix, value, percent] = m;
  return {
    prefix,
    value: parseFloat(value),
    percentage: !!percent,
  };
}

function tryParseHour(a: Adapter) {
  const m = a.name.match(HOUR_REGEX);
  if (!m) return null;

  const [, hour, neg] = m;
  return {
    bit_position: parseInt(hour),
    state: neg === "N" ? !a.state : a.state,
  };
}

function tryParseDay(a: Adapter) {
  const m = a.name.match(DAY_REGEX);
  if (!m) return null;

  const [, day, neg] = m;
  return {
    bit_position: parseInt(day),
    state: neg === "N" ? !a.state : a.state,
  };
}

function tryParseCycle(a: Adapter) {
  const m = a.name.match(CYCLE_REGEX);
  if (!m) return null;

  const [, cycle, neg] = m;
  return {
    bit_position: parseInt(cycle),
    state: neg === "N" ? !a.state : a.state,
  };
}
