import React from 'react';

// This would typically be fetched from an API
const projects = [
  {
    name: "Sumatra Forest Conservation",
    type: "Forest Conservation",
    location: "Sumatra, Indonesia",
    description: "This project protects 15,000 hectares of rainforest in Sumatra, preventing deforestation and preserving habitat for endangered species such as the Sumatran tiger and orangutan.",
    contribution: 15.2,
    imageUrl: "https://via.placeholder.com/300x200?text=Forest+Conservation"
  },
  {
    name: "Java Solar Farm",
    type: "Renewable Energy",
    location: "Java, Indonesia",
    description: "This solar farm in Java generates clean electricity, reducing dependence on fossil fuels and preventing carbon emissions while providing jobs to the local community.",
    contribution: 7.8,
    imageUrl: "https://via.placeholder.com/300x200?text=Solar+Farm"
  },
  {
    name: "Bali Mangrove Restoration",
    type: "Blue Carbon",
    location: "Bali, Indonesia",
    description: "This project restores mangrove ecosystems in Bali, enhancing carbon sequestration, protecting coastlines from erosion, and providing habitat for marine species.",
    contribution: 2.4,
    imageUrl: "https://via.placeholder.com/300x200?text=Mangrove+Restoration"
  }
];

const ProjectsContent: React.FC = () => {
  return (
    <div className="projects-content">
      <h3>Your Carbon Offset Projects</h3>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <img
                src={project.imageUrl}
                alt={project.type}
              />
            </div>
            <div className="project-details">
              <h4>{project.name}</h4>
              <p className="project-type">{project.type}</p>
              <p className="project-location">{project.location}</p>
              <p className="project-description">
                {project.description}
              </p>
              <div className="project-impact">
                <span className="impact-label">Your contribution:</span>
                <span className="impact-value">{project.contribution} tonnes CO₂</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;