import React from "react";
import { CalendarIcon, MapPin, BookOpen, Users } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

interface ProjectDetailsTabProps {
  startDate: string;
  endDate: string;
  location: string;
  coordinates: string;
  methodology: string;
  projectDeveloper: string;
}

const ProjectDetailsTab: React.FC<ProjectDetailsTabProps> = ({
  startDate,
  endDate,
  location,
  coordinates,
  methodology,
  projectDeveloper
}) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <TabsContent value="details" className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Project Timeline</h3>
            <p className="text-sm text-muted-foreground">
              {formatDate(startDate)} to {formatDate(endDate)}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Project Location</h3>
            <p className="text-sm text-muted-foreground">
              {location} ({coordinates})
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Methodology</h3>
            <p className="text-sm text-muted-foreground">
              {methodology}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Project Developer</h3>
            <p className="text-sm text-muted-foreground">
              {projectDeveloper}
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default ProjectDetailsTab;