import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { GraphInfo } from "../utils/types";
import { FaQuestionCircle } from "react-icons/fa";

const QuestionCircle = FaQuestionCircle as unknown as React.FC;

const formatTime = (t: number) =>
  new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const GraphWidget: React.FC<{ name: string; graph: GraphInfo }> = ({
  name,
  graph,
}) => {
  const min = Math.min(...graph.thresholds);
  const max = Math.max(...graph.thresholds);

  const margin = (max - min) * 0.1 || 1;

  const yMin = min - margin;
  const yMax = max + margin;

  return (
    <div className="graphCard">
      <div className="graphHeader">
        <span className="graphTitle">{name}</span>

        <Tippy content={`Thresholds: ${graph.thresholds.sort((a, b) => a - b).join(", ")}`}>
          <span className="icon">
            <QuestionCircle />
          </span>
        </Tippy>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={graph.points}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="time"
            tickFormatter={formatTime}
            minTickGap={50}
          />

          <YAxis
            domain={[yMin, yMax]}
            label={{
              value: graph.percentage ? "%" : "",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <ReTooltip
            labelFormatter={(v) => formatTime(v as number)}
          />

          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphWidget;