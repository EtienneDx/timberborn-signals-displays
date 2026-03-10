import "tippy.js/dist/tippy.css";
import { useAutomationData } from "../AutomationContext";
import { SignalWidget } from "./SignalWidget";


const SignalsPanel = () => {
  const { signals } = useAutomationData();

  const sorted = Object.entries(signals).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return (
    <div className="signalGrid">
      {sorted.map(([name, value]) => (
        <SignalWidget key={name} name={name} value={value} />
      ))}
    </div>
  );
};

export default SignalsPanel;