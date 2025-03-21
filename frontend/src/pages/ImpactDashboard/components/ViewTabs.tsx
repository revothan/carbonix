import React from 'react';
import { ViewType } from '../types';

interface ViewTabsProps {
  selectedView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const ViewTabs: React.FC<ViewTabsProps> = ({
  selectedView,
  onViewChange
}) => {
  return (
    <div className="impact-view-tabs">
      <button
        className={`view-tab ${selectedView === "overview" ? "active" : ""}`}
        onClick={() => onViewChange("overview")}
      >
        Overview
      </button>
      <button
        className={`view-tab ${selectedView === "projects" ? "active" : ""}`}
        onClick={() => onViewChange("projects")}
      >
        Projects
      </button>
      <button
        className={`view-tab ${selectedView === "sdg" ? "active" : ""}`}
        onClick={() => onViewChange("sdg")}
      >
        SDG Impact
      </button>
    </div>
  );
};

export default ViewTabs;