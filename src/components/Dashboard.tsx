import { useState } from "react";
import GraphsPanel from "./GraphPanel";
import Header from "./Header";
import { HelpModal } from "./HelpModal";
import SignalsPanel from "./SignalsPanel";

const Dashboard = () => {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <Header openHelp={() => setHelpOpen(true)} />

      <GraphsPanel />

      <SignalsPanel />

      {helpOpen && <HelpModal close={() => setHelpOpen(false)} />}
    </>
  );
};

export default Dashboard;