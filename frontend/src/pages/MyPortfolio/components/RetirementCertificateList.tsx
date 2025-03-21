import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { Retirement } from '../types';
import { formatPurpose, formatProjectType, getProjectIcon } from '../utils';

interface RetirementCertificateListProps {
  retirements: Retirement[];
}

const RetirementCertificateList: React.FC<RetirementCertificateListProps> = ({
  retirements,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Retirement Certificates</h2>
        <div className="flex gap-2">
          <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground">
            <Download className="mr-2 h-4 w-4" /> Export
          </button>
          <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {retirements.map((certificate) => (
          <div
            key={certificate.id}
            className="rounded-lg border shadow-sm bg-card text-card-foreground overflow-hidden"
          >
            <div className="flex border-b">
              <div
                className="w-16 h-16 flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: certificate.color }}
              >
                {getProjectIcon(certificate.projectType)}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">
                  Certificate #{certificate.certificateId}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    {formatPurpose(certificate.purpose)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Project</p>
                  <p className="font-medium">{certificate.projectName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">
                    {formatProjectType(certificate.projectType)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Standard</p>
                  <p className="font-medium">{certificate.standard}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vintage</p>
                  <p className="font-medium">{certificate.vintage}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">
                    {certificate.quantity} tonnes
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Beneficiary
                  </p>
                  <p className="font-medium">{certificate.beneficiary}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground">
                  <Download className="mr-2 h-4 w-4" /> Download
                </button>
                <button className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                  View Certificate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetirementCertificateList;
