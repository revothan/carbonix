import React from 'react';
import { TimeRange } from '../types';

interface TimeRangeSelectorProps {
  selectedTimeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedTimeRange,
  onTimeRangeChange
}) => {
  return (
    <div className="time-range-selector">
      <button
        className={`time-range-button ${selectedTimeRange === "month" ? "active" : ""}`}
        onClick={() => onTimeRangeChange("month")}
      >
        This Month
      </button>
      <button
        className={`time-range-button ${selectedTimeRange === "year" ? "active" : ""}`}
        onClick={() => onTimeRangeChange("year")}
      >
        This Year
      </button>
      <button
        className={`time-range-button ${selectedTimeRange === "all" ? "active" : ""}`}
        onClick={() => onTimeRangeChange("all")}
      >
        All Time
      </button>
    </div>
  );
};

export default TimeRangeSelector;