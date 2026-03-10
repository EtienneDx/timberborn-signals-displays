import React from "react";

//////////////////////
// Help Modal
//////////////////////
export const HelpModal: React.FC<{ close: () => void; }> = ({ close }) => (
  <div className="modalBackdrop" onClick={close}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>Signal setup</h2>

      <h4>Graph signals</h4>

      <p>Create signals like:</p>

      <pre>
        My graph name &gt; 50
        <br />
        My graph name &gt; 60
        <br />
        My graph name &gt; 70
      </pre>

      <p>The highest active threshold is graphed, the others are used to set the graph range. You can add a '%' sign after the number, the graph will be treated as a percentage graph.</p>

      <h4>Weather signals</h4>

      <p>You can setup the following weather signals to display the weather in the page top right:</p>

      <pre>
        WEATHER DROUGHT
        <br />
        WEATHER BADTIDE
      </pre>

      <h4>Simple signals</h4>

      <p>Any other signal will be displayed as an independant signal.</p>

      <button className="buttonPrimary" onClick={close}>
        Close
      </button>
    </div>
  </div>
);
