import React from 'react';
import { SDGContribution } from '../types';

interface SDGContentProps {
  sdgContributions: SDGContribution[];
}

const SDGContent: React.FC<SDGContentProps> = ({
  sdgContributions
}) => {
  return (
    <div className="sdg-content">
      <h3>Sustainable Development Goals Impact</h3>
      <p className="sdg-description">
        Your carbon offset contributions support multiple UN Sustainable
        Development Goals. Here's how your actions are making a
        difference:
      </p>

      <div className="sdg-grid">
        {sdgContributions.map((sdg, index) => (
          <div key={index} className={`sdg-card ${sdg.contribution}`}>
            <div className="sdg-icon">
              <img
                src={`https://via.placeholder.com/80?text=SDG${sdg.sdg}`}
                alt={`SDG ${sdg.sdg}`}
              />
            </div>
            <div className="sdg-info">
              <h4>
                Goal {sdg.sdg}: {sdg.label}
              </h4>
              <div className={`contribution-meter ${sdg.contribution}`}>
                <div className="meter-fill"></div>
              </div>
              <p className="contribution-label">
                {sdg.contribution.charAt(0).toUpperCase() +
                  sdg.contribution.slice(1)}{" "}
                Contribution
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="sdg-learn-more">
        <p>
          Want to learn more about how carbon offsetting supports the UN
          Sustainable Development Goals?
        </p>
        <a
          href="https://sdgs.un.org/goals"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          Learn More About SDGs
        </a>
      </div>
    </div>
  );
};

export default SDGContent;