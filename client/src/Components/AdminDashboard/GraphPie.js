import { colors } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { pieArcLabelClasses } from "@mui/x-charts/PieChart";

import React from "react";

const GraphPie = ({
  total,
  totalLabel,
  totalColor,
  target,
  targetLabel,
  targetColor,
}) => {
  const data = [
    { label: totalLabel, value: total - target, color: totalColor },
    { label: targetLabel, value: target, color: targetColor },
  ];
  const sizing = {
    margin: { right: 180 },
    width: 200,
    height: 200,
    legend: { hidden: false },
  };

  const getArcLabel = () => {
    const percent = target / total;

    return `${(percent * 100).toFixed()}%`;
  };

  return (
    <div className="pie-container">
      <PieChart
        series={[
          {
            outerRadius: 80,
            innerRadius: 45,
            data,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
          },
        }}
        {...sizing}
        width={400}
        height={200}
      />
    </div>
  );
};

export default GraphPie;
