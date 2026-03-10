import "tippy.js/dist/tippy.css";
import { useAutomationData } from "../AutomationContext";
import GraphWidget from "./GraphWidget";

const GraphsPanel = () => {
  const { graphs } = useAutomationData();

  return (
    <div className="graphGrid">
      {Object.entries(graphs).map(([name, g]) => (
        <GraphWidget key={name} name={name} graph={g} />
      ))}
    </div>
  );
};

export default GraphsPanel;