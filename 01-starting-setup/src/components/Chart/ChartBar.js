import React from "react";

import "./ChartBar.css";

const ChartBar = function (props) {
  let barFillHeight = "0%";

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
};

/* U reactu style attribute ocekuje objekat {} kao parametar.
Properties tog objekta su onda razliciti styles
npr. "height: sth" ili "backgroundColor: sth" */

export default ChartBar;
