import React from 'react';
import { Credit } from '../types';
import { formatCurrency, formatProjectType, getProjectIcon } from '../utils';

interface CreditTableProps {
  credits: Credit[];
}

const CreditTable: React.FC<CreditTableProps> = ({ credits }) => {
  return (
    <div className="rounded-lg border shadow-sm bg-card text-card-foreground">
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Project
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Type
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Standard
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Vintage
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Quantity
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Value
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {credits.map((credit) => (
                <tr
                  key={credit.id}
                  className="border-b hover:bg-muted/50"
                >
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded flex items-center justify-center"
                        style={{ backgroundColor: credit.color }}
                      >
                        {getProjectIcon(credit.projectType)}
                      </div>
                      <span className="font-medium">
                        {credit.projectName}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    {formatProjectType(credit.projectType)}
                  </td>
                  <td className="p-4 align-middle">
                    {credit.standard}
                  </td>
                  <td className="p-4 align-middle">
                    {credit.vintage}
                  </td>
                  <td className="p-4 align-middle">
                    {credit.quantity} tonnes
                  </td>
                  <td className="p-4 align-middle">
                    {formatCurrency(credit.totalPrice)}
                  </td>
                  <td className="p-4 align-middle">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${credit.status === 'listed' ? 'bg-blue-600 text-white' : ''}`}
                    >
                      {credit.status.charAt(0).toUpperCase() +
                        credit.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex gap-2">
                      {credit.status === 'listed' ? (
                        <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground">
                          View Listing
                        </button>
                      ) : (
                        <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground">
                          List
                        </button>
                      )}
                      <button className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                        Retire
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreditTable;
