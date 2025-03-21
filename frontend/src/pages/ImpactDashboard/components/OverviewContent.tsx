import React from 'react';
import { TimelineItem, ProjectType } from '../types';

interface OverviewContentProps {
  timeline: TimelineItem[];
  projectTypes: ProjectType[];
}

const OverviewContent: React.FC<OverviewContentProps> = ({
  timeline,
  projectTypes
}) => {
  return (
    <div className="overview-content">
      <div className="impact-chart timeline-chart">
        <h3>Carbon Offset Timeline</h3>
        <div className="chart-placeholder">
          {/* In a real app, this would be a chart component */}
          <div className="mock-chart">
            <div className="chart-bars">
              {timeline.map((month, index) => (
                <div key={index} className="chart-bar-container">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${(month.amount / Math.max(...timeline.map((m) => m.amount))) * 100}%`,
                    }}
                  ></div>
                  <div className="chart-label">{month.month}</div>
                </div>
              ))}
            </div>
            <div className="chart-y-axis">
              <div className="y-label">tonnes CO₂</div>
            </div>
          </div>
        </div>
      </div>

      <div className="impact-chart project-types-chart">
        <h3>Offset by Project Type</h3>
        <div className="chart-placeholder">
          {/* In a real app, this would be a chart component */}
          <div className="mock-pie-chart">
            <div className="pie-segments">
              {projectTypes.map((type, index) => (
                <div
                  key={index}
                  className={`pie-segment ${type.type}`}
                  style={{
                    transform: `rotate(${index * 120}deg)`,
                    backgroundColor:
                      index === 0
                        ? "#4caf50"
                        : index === 1
                          ? "#2196f3"
                          : "#ff9800",
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="chart-legend">
            {projectTypes.map((type, index) => (
              <div key={index} className="legend-item">
                <div
                  className="legend-color"
                  style={{
                    backgroundColor:
                      index === 0
                        ? "#4caf50"
                        : index === 1
                          ? "#2196f3"
                          : "#ff9800",
                  }}
                ></div>
                <div className="legend-label">{type.label}</div>
                <div className="legend-value">{type.amount} tonnes</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;