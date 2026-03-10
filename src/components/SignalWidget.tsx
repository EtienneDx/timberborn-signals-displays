import React from "react";

//////////////////////
// Signal widget
//////////////////////
export const SignalWidget: React.FC<{ name: string; value: boolean; }> = ({
  name, value,
}) => (
  <div className={`signalCard ${value ? "on" : "off"}`}>
    <div className="signalName">{name}</div>
    <div className="signalState">{value ? "ACTIVE" : "OFF"}</div>
  </div>
);
