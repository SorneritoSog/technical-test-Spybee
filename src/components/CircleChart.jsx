import React from "react";
import styles from "./CircleChart.module.css";

const CircleChart = ({ percentage = 0, value = 0, color = "#F56464", size = 75, strokeWidth = 7 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles["chart-container"]} style={{ width: size, height: size }}>
      <svg
        className={styles["progress-ring"]}
        width={size}
        height={size}
      >
        {/* Background Circle */}
        <circle
          stroke="#D2D2D2"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className={styles["chart-text"]}>
        <span className="text-xl font-medium text-primary">{value}</span>
      </div>
    </div>
  );
};

export default CircleChart;
