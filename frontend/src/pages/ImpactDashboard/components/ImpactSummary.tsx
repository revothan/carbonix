import React from 'react';
import { ImpactMetrics } from '../types';

interface ImpactSummaryProps {
  totalOffset: number;
  impact: ImpactMetrics;
}

const ImpactSummary: React.FC<ImpactSummaryProps> = ({
  totalOffset,
  impact
}) => {
  return (
    <div className="impact-summary">
      <div className="impact-card total-offset">
        <h3>Total Carbon Offset</h3>
        <div className="impact-value">
          <span className="value">{totalOffset}</span>
          <span className="unit">tonnes CO₂</span>
        </div>
        <p className="impact-equivalent">
          Equivalent to the average emissions of{" "}
          {Math.round(totalOffset * 0.21)} people per year
        </p>
      </div>

      <div className="impact-card trees">
        <h3>Trees Equivalent</h3>
        <div className="impact-value">
          <span className="value">{impact.trees}</span>
          <span className="unit">trees</span>
        </div>
        <p className="impact-equivalent">
          Equivalent to planting and growing {impact.trees} trees
          for 10 years
        </p>
      </div>

      <div className="impact-card renewable-energy">
        <h3>Renewable Energy</h3>
        <div className="impact-value">
          <span className="value">
            {(impact.renewableEnergy / 1000).toFixed(1)}
          </span>
          <span className="unit">MWh</span>
        </div>
        <p className="impact-equivalent">
          Equivalent to powering{" "}
          {Math.round(impact.renewableEnergy / 900)} homes for a
          month
        </p>
      </div>
    </div>
  );
};

export default ImpactSummary;