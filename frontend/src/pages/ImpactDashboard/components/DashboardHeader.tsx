import React from 'react';

interface DashboardHeaderProps {
  onShareReport: () => void;
  onDownloadCertificate: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onShareReport,
  onDownloadCertificate
}) => {
  return (
    <div className="page-header">
      <h1>Carbon Impact Dashboard</h1>
      <div className="header-actions">
        <button className="btn btn-outline" onClick={onShareReport}>
          <i className="fas fa-share-alt"></i> Share Report
        </button>
        <button className="btn btn-outline" onClick={onDownloadCertificate}>
          <i className="fas fa-certificate"></i> Download Certificate
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;