import React from "react";
import { ExternalLink } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface VerificationTabProps {
  verifier: string;
  verificationDate: string;
  standard: string;
  registryId: string;
  registryLink: string;
}

const VerificationTab: React.FC<VerificationTabProps> = ({
  verifier,
  verificationDate,
  standard,
  registryId,
  registryLink
}) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <TabsContent value="verification" className="space-y-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Verification Information</h3>
          <p className="text-muted-foreground">
            This project has been verified by an independent third party to ensure it meets the requirements of the carbon standard.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Verification Body</p>
            <p className="font-medium">{verifier}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Verification Date</p>
            <p className="font-medium">{formatDate(verificationDate)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Registry</p>
            <p className="font-medium">{standard.split('(')[0].trim()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Registry ID</p>
            <div className="flex items-center gap-1">
              <p className="font-medium">{registryId}</p>
              <a 
                href={registryLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                <ExternalLink className="h-3 w-3" />
                <span className="sr-only">View on registry</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button variant="outline" asChild className="gap-2">
            <a 
              href={registryLink} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              View on Registry Website
            </a>
          </Button>
        </div>
      </div>
    </TabsContent>
  );
};

export default VerificationTab;