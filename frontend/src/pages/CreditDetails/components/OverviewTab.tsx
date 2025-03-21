import React from "react";
import { ExternalLink } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

interface OverviewTabProps {
  description: string;
  projectType: string;
  standard: string;
  vintage: number;
  projectDeveloper: string;
  location: string;
  registryId: string;
  registryLink: string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  description,
  projectType,
  standard,
  vintage,
  projectDeveloper,
  location,
  registryId,
  registryLink
}) => {
  const getProjectTypeLabel = (type: string): string => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <TabsContent value="overview" className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Project Description</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Project Type</p>
          <p className="font-medium">{getProjectTypeLabel(projectType)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Standard</p>
          <p className="font-medium">{standard}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Vintage</p>
          <p className="font-medium">{vintage}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Project Developer</p>
          <p className="font-medium">{projectDeveloper}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="font-medium">{location}</p>
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
    </TabsContent>
  );
};

export default OverviewTab;