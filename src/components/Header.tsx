//////////////////////
// Header
//////////////////////

import Tippy from "@tippyjs/react";
import { useAutomationData } from "../AutomationContext";
import { FaQuestionCircle } from "react-icons/fa";

const QuestionCircle = FaQuestionCircle as unknown as React.FC;

const Header = ({ openHelp }: { openHelp: () => void }) => {
  const { weather } = useAutomationData();

  return (
    <div className="header">
      <div className="title">Timberborn automation viewer</div>

      <div className="headerRight">
        <div className="weather">{weather}</div>

        <Tippy content="Help">
          <button className="iconButton" onClick={openHelp}>
            <QuestionCircle />
          </button>
        </Tippy>
      </div>
    </div>
  );
};

export default Header;