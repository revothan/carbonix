# Carbonix: Blockchain-Based Carbon Credit Marketplace for Indonesia

<div align="center">
  <img src="https://placehold.co/600x300/2e7d32/FFFFFF?text=Carbonix+Platform" alt="Carbonix Platform" width="600" />
</div>

## Overview

Carbonix is a decentralized carbon credit marketplace built on the Lisk blockchain that revolutionizes how carbon credits are verified, traded, and retired in Indonesia. By leveraging blockchain technology, IDRX stablecoin integration, and Xellar Kit wallet solutions, Carbonix creates an unprecedented level of transparency, efficiency, and accessibility in Indonesia's emerging carbon market.

The platform enables seamless transactions between carbon credit generators (such as forest conservation projects, renewable energy initiatives, and sustainable agriculture programs) and credit buyers (corporations, institutions, and individuals seeking to offset their carbon footprint).

## Key Features

### 1. Tokenized Carbon Credits ♻️
Carbon credits represented as unique digital assets on the Lisk blockchain with comprehensive metadata:
- Project origin and geographic location
- Verification standard (VCS, Gold Standard, etc.)
- Vintage year and methodology
- Quantifiable environmental impact metrics
- Ownership and transaction history

### 2. Multi-Level Verification System 🔍
A robust three-tier verification framework to ensure credit legitimacy:
- Traditional verification bodies (established certifiers)
- Community-based validation (decentralized stakeholder reviews)
- Algorithmic validation (preventing double-counting and fraud)

### 3. IDRX-Powered Marketplace 💱
All transactions denominated in Indonesia's stablecoin (IDRX):
- 1:1 peg with Indonesian Rupiah for price stability
- Seamless conversion between IDR and IDRX
- Fractional credit trading (purchase portions of credits)
- Low transaction fees and rapid settlement

### 4. Transparent Credit Lifecycle 📊
Immutable on-chain records from issuance through trading to retirement:
- Complete provenance tracking
- Real-time status updates
- Publicly verifiable retirement certificates
- Auditable transaction history for compliance reporting

### 5. Simplified User Experience 🤝
Intuitive interfaces designed for all user types:
- Social login options through Xellar Kit
- Non-custodial wallet creation
- Simple portfolio management
- Mobile-responsive design

### 6. Impact Analytics Dashboard 📈
Interactive visualizations for tracking carbon offset impact:
- Personal and organizational carbon footprint calculations
- Visual breakdown of offset by project type
- SDG (Sustainable Development Goal) contribution metrics
- Shareable reports for ESG compliance

### 7. Automated Regulatory Compliance ⚖️
Smart contracts ensuring adherence to Indonesia's regulations:
- Presidential Regulation No. 98/2021 compliance
- Automatic fee calculation and distribution
- Reporting capabilities for regulatory submissions
- Adaptable to evolving carbon market standards

## Market Impact

Carbonix addresses critical challenges in Indonesia's current carbon market infrastructure:

- **Double-Counting Prevention**: Blockchain's immutable ledger eliminates the risk of credits being used multiple times
- **Verification Efficiency**: Decentralized validation reduces bottlenecks in the traditional certification process
- **Increased Accessibility**: Lower barriers to entry for both credit generators and buyers, especially SMEs and local communities
- **Enhanced Trust**: Unprecedented transparency builds confidence in the voluntary carbon market
- **National Climate Goals**: Accelerates Indonesia's progress toward its emissions reduction targets (29% by 2030)

By digitizing and democratizing carbon credit trading, Carbonix unlocks billions in untapped value from Indonesia's vast natural resources while ensuring these benefits flow to local communities and genuine conservation efforts.

## Technical Architecture

The platform is built on four core smart contract components:

### Registry Contract
- Handles credit issuance and metadata management
- Stores detailed project information and impact metrics
- Maps credits to verification status and project history

### Marketplace Contract
- Facilitates trading with IDRX settlement
- Manages order books, bids, and listings
- Processes fractional credit transfers

### Verification Contract
- Implements the multi-tiered validation system
- Coordinates between traditional verifiers and community validators
- Executes algorithmic checks for duplicate prevention

### Retirement Contract
- Processes credit retirement for carbon offsetting
- Generates immutable proof-of-retirement certificates
- Records beneficiary and purpose information

These contracts work with a TypeScript-based React frontend, integrated with Xellar Kit for wallet management and IDRX for transactions, all deployed on the Lisk blockchain to leverage its speed, low fees, and growing ecosystem.

## Repository Structure

```
├── contracts/             # Smart contracts for the Lisk blockchain
│   ├── registry/         # Registry contract implementation
│   ├── marketplace/      # Marketplace contract implementation
│   ├── verification/     # Verification contract implementation
│   └── retirement/       # Retirement contract implementation
├── frontend/             # TypeScript React-based user interface
│   ├── public/           # Public assets
│   └── src/              # Source code
│       ├── components/   # Reusable UI components
│       ├── pages/        # Application pages
│       ├── services/     # API and blockchain services
│       └── assets/       # Images, styles, and other assets
├── docs/                 # Documentation
├── scripts/              # Deployment and utility scripts
└── tests/                # Test suites
```

## Screenshots

<div align="center">
  <h3>Marketplace View</h3>
  <img src="https://placehold.co/800x400/2e7d32/FFFFFF?text=Marketplace+Screenshot" alt="Marketplace Screenshot" width="800" />
  
  <h3>Carbon Impact Dashboard</h3>
  <img src="https://placehold.co/800x400/0288d1/FFFFFF?text=Impact+Dashboard+Screenshot" alt="Impact Dashboard Screenshot" width="800" />
  
  <h3>Certificate Generation</h3>
  <img src="https://placehold.co/800x400/ff9800/FFFFFF?text=Certificate+Screenshot" alt="Certificate Screenshot" width="800" />
</div>

## Getting Started

### Prerequisites

- Node.js (v16+)
- NPM or Yarn
- Lisk SDK
- IDRX integration credentials
- Xellar Kit API keys

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/revothan/carbonix.git
   cd carbonix
   ```

2. Install dependencies:
   ```bash
   # Install all dependencies at once
   npm run install:all
   
   # Or install separately
   # Smart contract dependencies
   cd contracts
   npm install
   
   # Frontend dependencies
   cd ../frontend
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. Run development environment:
   ```bash
   # Start local blockchain
   npm run blockchain:dev
   
   # Deploy contracts to local network
   npm run deploy:local
   
   # Start frontend
   npm run frontend:dev
   
   # Or run everything concurrently
   npm run dev
   ```

## Deployment

### Testnet Deployment
```bash
# Deploy to Lisk testnet
npm run deploy:testnet

# Configure frontend for testnet
cd frontend
npm run build:testnet
```

### Production Deployment
```bash
# Deploy to Lisk mainnet
npm run deploy:mainnet

# Build production frontend
cd frontend
npm run build
```

## Technology Stack

- **Blockchain**: Lisk SDK for core infrastructure
- **Smart Contracts**: JavaScript-based custom modules
- **Frontend**: TypeScript React with TailwindCSS
- **Wallet Integration**: Xellar Kit SDK
- **Payment Integration**: IDRX Stablecoin API
- **Analytics**: Custom dashboards with Recharts
- **Authentication**: OAuth and blockchain wallet-based auth

## TypeScript Migration

The frontend has been fully migrated from JavaScript to TypeScript to improve code quality, maintainability, and developer experience. Key benefits include:

- **Type Safety**: Strong static typing reduces runtime errors and improves code reliability
- **Enhanced IDE Support**: Better autocomplete, navigation, and refactoring capabilities
- **Improved Documentation**: Types serve as built-in documentation for component props and API interfaces
- **Better Scalability**: Makes the codebase more maintainable as the project grows

The migration involved:
- Converting all JSX components to TSX
- Adding proper type definitions for all component props
- Creating interfaces for service responses and requests
- Adding comprehensive type coverage for integration with external services

## Contributing

We welcome contributions to Carbonix! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for more information.

## Roadmap

- **Q2 2025**: Launch on Lisk testnet with initial verification partners
- **Q3 2025**: Add mobile application and expand project types
- **Q4 2025**: Implement cross-chain interoperability with major carbon token standards
- **Q1 2026**: Integrate with international carbon registries
- **Q2 2026**: Mainnet launch with full feature set

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact and Support

- **Website**: [carbonix.app](https://carbonix.app)
- **Email**: [info@carbonix.app](mailto:info@carbonix.app)
- **Twitter**: [@carbonix](https://twitter.com/carbonix)

For technical questions or help with development, please open an issue on this repository.

---

Carbonix represents the future of environmental finance in Indonesia, combining blockchain innovation with real-world impact to accelerate the country's transition to a low-carbon economy.
