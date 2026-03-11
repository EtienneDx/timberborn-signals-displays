import { useState } from "react";
import GraphsPanel from "./GraphPanel";
import Header from "./Header";
import { HelpModal } from "./HelpModal";
import SignalsPanel from "./SignalsPanel";
import { useAutomationData } from "../AutomationContext";
import ErrorModal from "./ErrorModal";

const Dashboard = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  const { error } = useAutomationData();

  return (
    <>
      <Header openHelp={() => setHelpOpen(true)} />

      {typeof error === "undefined" ? <>
        <GraphsPanel />

        <SignalsPanel />
      </> : <ErrorModal />}
      {helpOpen && <HelpModal close={() => setHelpOpen(false)} />}
    </>
  );
};

export default Dashboard;