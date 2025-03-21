import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ImpactTabProps {
  sdgs: string[];
  quantityOffset: number;
}

const ImpactTab: React.FC<ImpactTabProps> = ({
  sdgs,
  quantityOffset
}) => {
  // SDG icon and color mapping (simplified for this example)
  const sdgDetails: Record<string, { color: string; icon: string }> = {
    "No Poverty": { color: "bg-red-500", icon: "🎯" },
    "Zero Hunger": { color: "bg-yellow-500", icon: "🍲" },
    "Good Health and Well-being": { color: "bg-green-500", icon: "❤️" },
    "Quality Education": { color: "bg-red-700", icon: "📚" },
    "Gender Equality": { color: "bg-red-400", icon: "⚧️" },
    "Clean Water and Sanitation": { color: "bg-blue-400", icon: "💧" },
    "Affordable and Clean Energy": { color: "bg-yellow-600", icon: "⚡" },
    "Decent Work and Economic Growth": { color: "bg-red-800", icon: "📈" },
    "Industry, Innovation and Infrastructure": { color: "bg-orange-500", icon: "🏭" },
    "Reduced Inequality": { color: "bg-pink-600", icon: "🤝" },
    "Sustainable Cities and Communities": { color: "bg-amber-700", icon: "🏙️" },
    "Responsible Consumption and Production": { color: "bg-amber-600", icon: "♻️" },
    "Climate Action": { color: "bg-green-600", icon: "🌡️" },
    "Life Below Water": { color: "bg-blue-600", icon: "🐟" },
    "Life on Land": { color: "bg-green-700", icon: "🌳" },
    "Peace, Justice and Strong Institutions": { color: "bg-blue-700", icon: "⚖️" },
    "Partnerships for the Goals": { color: "bg-blue-900", icon: "🤝" }
  };

  const impactMetrics = [
    {
      title: "Carbon Emissions Avoided",
      value: `${quantityOffset} tonnes`,
      description: "Equivalent to taking this many cars off the road for a year",
      icon: "🚗",
      calculation: Math.round(quantityOffset * 0.22) // Rough estimate: 1 tonne CO2 ≈ 0.22 cars per year
    },
    {
      title: "Trees Conserved",
      value: `${Math.round(quantityOffset * 50)}`,
      description: "Equivalent number of mature trees needed to sequester this carbon",
      icon: "🌳",
      calculation: Math.round(quantityOffset * 50) // Rough estimate: 1 tonne CO2 ≈ 50 trees
    },
    {
      title: "Flight Equivalence",
      value: `${Math.round(quantityOffset * 0.5)} flights`,
      description: "Number of round-trip flights (New York to London) offset",
      icon: "✈️",
      calculation: Math.round(quantityOffset * 0.5) // Rough estimate: 1 tonne CO2 ≈ 0.5 long-haul flights
    }
  ];

  return (
    <TabsContent value="impact" className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Sustainable Development Goals</h3>
        <p className="text-muted-foreground mb-4">
          This project contributes to the following UN Sustainable Development Goals:
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {sdgs.map((sdg) => (
            <Badge key={sdg} variant="outline" className="text-sm py-1 px-3">
              <span className="mr-1">{sdgDetails[sdg]?.icon || "🎯"}</span> {sdg}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Impact Metrics</h3>
        <p className="text-muted-foreground mb-4">
          The environmental impact of this project can be visualized in these terms:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {impactMetrics.map((metric) => (
            <div 
              key={metric.title} 
              className="bg-primary/5 rounded-lg p-4 border border-primary/10"
            >
              <div className="text-3xl mb-2">{metric.icon}</div>
              <h4 className="font-medium">{metric.title}</h4>
              <p className="text-2xl font-bold my-2">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Community Impact</h3>
        <p className="text-muted-foreground">
          This project supports local communities through job creation, sustainable development practices, 
          and improved environmental conditions. By protecting natural resources and promoting sustainable land use, 
          the project contributes to long-term community resilience and economic stability.
        </p>
      </div>
    </TabsContent>
  );
};

export default ImpactTab;