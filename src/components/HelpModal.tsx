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

      <h4>Clock signals</h4>

      <p>Clock signals are used to display the current in-game time. These signals are binary encoded as follow:</p>

      <pre>
        HOUR 0
        HOUR 1
        HOUR 2
        HOUR 3
        HOUR 4
      </pre>

      <p>The number corresponds to the bit position in a 5-bit binary representation of the hour. Due to ingame limitations, it is easier to pass on negative signals. To do so, simply add a `N` after the bit number:</p>

      <pre>
        HOUR 0N
        HOUR 1N
        HOUR 2N
        HOUR 3N
        HOUR 4N
      </pre>

      <p>The exact same logic applies to `DAY X` and `CYCLE Y` signals. You can setup as many bits as you want, the page will pick it up. This can allow for example to only update the page every 4th hour by providing only 3 signals instead of 5.</p>

      <h4>Simple signals</h4>

      <p>Any other signal will be displayed as an independant signal.</p>

      <button className="buttonPrimary" onClick={close}>
        Close
      </button>
    </div>
  </div>
);
