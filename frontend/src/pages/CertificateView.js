import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CertificateView = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        // Mock data for the certificate
        const mockCertificate = {
          id: id,
          retirementId: 'ret-20230610-12345678',
          certificateId: id,
          retiree: 'user-123456789',
          beneficiary: 'Eco Solutions Inc.',
          beneficiaryAddress: 'Jakarta, Indonesia',
          totalCO2Tonnes: 15,
          purpose: 'carbon_neutral_company',
          details: {
            companyName: 'Eco Solutions Inc.',
            yearOfEmissions: 2023
          },
          retirementDate: '2023-06-10T09:45:00Z',
          certificateDate: '2023-06-10T09:50:00Z',
          credits: [
            {
              creditId: 'credit-001',
              quantity: 10,
              vintage: 2023,
              standard: 'VCS',
              projectId: 'project-001',
              projectName: 'Sumatra Forest Conservation',
              projectType: 'forest_conservation',
              country: 'Indonesia'
            },
            {
              creditId: 'credit-002',
              quantity: 5,
              vintage: 2022,
              standard: 'Gold Standard',
              projectId: 'project-002',
              projectName: 'Java Solar Farm',
              projectType: 'renewable_energy',
              country: 'Indonesia'
            }
          ],
          verificationUrl: `https://carbonix.app/verify/${id}`,
          blockchainHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
        };
        
        setCertificate(mockCertificate);
      } catch (error) {
        console.error('Error fetching certificate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  const handleDownloadPDF = () => {
    alert('In a real application, this would download a PDF version of the certificate.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Carbon Offset Certificate - ${certificate.beneficiary}`,
        text: `View the carbon offset certificate for ${certificate.beneficiary} - ${certificate.totalCO2Tonnes} tonnes CO₂e retired.`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href);
      alert('Certificate link copied to clipboard!');
    }
  };

  if (loading) {
    return <div className="loading">Loading certificate...</div>;
  }

  if (!certificate) {
    return <div className="error-message">Certificate not found</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPurposeLabel = (purpose) => {
    switch (purpose) {
      case 'carbon_neutral_product':
        return 'Carbon Neutral Product';
      case 'carbon_neutral_service':
        return 'Carbon Neutral Service';
      case 'carbon_neutral_company':
        return 'Carbon Neutral Company';
      case 'carbon_neutral_event':
        return 'Carbon Neutral Event';
      case 'carbon_neutral_individual':
        return 'Personal Carbon Footprint';
      case 'offsetting_emissions':
        return 'Emissions Offsetting';
      case 'corporate_social_responsibility':
        return 'Corporate Social Responsibility';
      default:
        return 'Other';
    }
  };

  return (
    <div className="certificate-container">
      <div className="certificate-actions">
        <div className="action-buttons">
          <button className="btn btn-outline" onClick={handleDownloadPDF}>
            <i className="fas fa-download"></i> Download PDF
          </button>
          <button className="btn btn-outline" onClick={handleShare}>
            <i className="fas fa-share-alt"></i> Share
          </button>
        </div>
        <Link to="/marketplace" className="btn btn-primary">
          <i className="fas fa-shopping-cart"></i> Browse More Credits
        </Link>
      </div>
      
      <div className="certificate">
        <div className="certificate-header">
          <div className="certificate-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="#2e7d32" />
              <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
            </svg>
            <span>Carbonix</span>
          </div>
          <div className="certificate-title">
            <h1>Carbon Offset Certificate</h1>
            <p className="certificate-subtitle">Powered by the Lisk Blockchain</p>
          </div>
          <div className="certificate-number">
            <span>Certificate ID:</span>
            <span className="id">{certificate.certificateId}</span>
          </div>
        </div>
        
        <div className="certificate-body">
          <div className="certificate-statement">
            <p>This certifies that</p>
            <h2 className="beneficiary-name">{certificate.beneficiary}</h2>
            <p>has retired</p>
            <div className="co2-amount">
              <span className="amount">{certificate.totalCO2Tonnes}</span>
              <span className="unit">tonnes CO₂e</span>
            </div>
            <p>of verified carbon credits for the purpose of</p>
            <h3 className="purpose">{getPurposeLabel(certificate.purpose)}</h3>
            {certificate.purpose === 'carbon_neutral_company' && certificate.details.companyName && (
              <p>for {certificate.details.companyName}</p>
            )}
            {certificate.purpose === 'carbon_neutral_product' && certificate.details.productName && (
              <p>for product: {certificate.details.productName}</p>
            )}
            {certificate.purpose === 'carbon_neutral_event' && certificate.details.eventName && (
              <p>for event: {certificate.details.eventName} on {formatDate(certificate.details.eventDate)}</p>
            )}
            <p className="retirement-date">
              Retirement Date: {formatDate(certificate.retirementDate)}
            </p>
          </div>
          
          <div className="certificate-credits">
            <h3>Retired Carbon Credits</h3>
            <table className="credits-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Type</th>
                  <th>Standard</th>
                  <th>Vintage</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {certificate.credits.map((credit, index) => (
                  <tr key={index}>
                    <td>{credit.projectName}</td>
                    <td>{credit.projectType.replace('_', ' ')}</td>
                    <td>{credit.standard}</td>
                    <td>{credit.vintage}</td>
                    <td>{credit.quantity} tonnes</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="verification-section">
            <h3>Verification</h3>
            <p>
              This certificate can be verified at:
              <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer" className="verification-link">
                {certificate.verificationUrl}
              </a>
            </p>
            <div className="blockchain-info">
              <p>
                <strong>Blockchain Transaction:</strong>
                <span className="blockchain-hash">{certificate.blockchainHash}</span>
              </p>
              <p>
                <strong>Certificate Issue Date:</strong> {formatDate(certificate.certificateDate)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="certificate-footer">
          <p>
            This carbon offset certificate represents the permanent retirement of carbon credits 
            on the blockchain. Once retired, these credits cannot be transferred or used again.
          </p>
          <div className="certificate-seal">
            <div className="seal-image">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="#2e7d32" />
                <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
              </svg>
            </div>
            <p className="seal-text">Verified on Lisk Blockchain</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
