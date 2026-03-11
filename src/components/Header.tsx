//////////////////////
// Header
//////////////////////

import Tippy from "@tippyjs/react";
import { useAutomationData } from "../AutomationContext";
import { FaQuestionCircle } from "react-icons/fa";

const QuestionCircle = FaQuestionCircle as unknown as React.FC;

const Header = ({ openHelp }: { openHelp: () => void }) => {
  const { weather, cycle, day, hour } = useAutomationData();
  console.log(weather, cycle, day, hour);

  return (
    <div className="header">
      <div className="title">Timberborn automation viewer</div>

      <div className="headerRight">
        <div className="weather">{weather}</div>

        {typeof cycle === "number" ? <div className="cycle">Cycle: {cycle}</div> : null}
        {typeof day === "number" ? <div className="day">Day: {day}</div> : null}
        {typeof hour === "number" ? <div className="hour">Hour: {hour}</div> : null}

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