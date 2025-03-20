import React, { useState, useEffect } from "react";
import idrxService from "../services/IDRXService";
import xellarKitService from "../services/XellarKitService";

const Wallet = ({ user }) => {
  const [activeTab, setActiveTab] = useState("balance");
  const [balance, setBalance] = useState({
    idrx: 0,
    lisk: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [convertAmount, setConvertAmount] = useState("");
  const [convertDirection, setConvertDirection] = useState("idrtoidrx"); // 'idrtoidrx' or 'idrxtoidr'
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    bankBranch: "",
  });
  const [depositAddress, setDepositAddress] = useState("");
  const [operationLoading, setOperationLoading] = useState(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // In a real app, these would be actual service calls
        // For demo, we'll use mock data

        // Mock balance data
        const mockBalance = {
          idrx: 1000000, // 1 million IDRX
          lisk: 5.5, // 5.5 LSK
        };

        // Mock transaction history
        const mockTransactions = [
          {
            id: "tx-001",
            type: "deposit",
            amount: 500000,
            currency: "IDRX",
            date: "2023-06-20T14:30:00Z",
            status: "completed",
            from: "IDR Conversion",
            to: user.walletAddress,
          },
          {
            id: "tx-002",
            type: "purchase",
            amount: 180000,
            currency: "IDRX",
            date: "2023-06-18T10:15:00Z",
            status: "completed",
            from: user.walletAddress,
            to: "seller-address-1",
            reference: "Carbon Credits Purchase",
          },
          {
            id: "tx-003",
            type: "withdraw",
            amount: 250000,
            currency: "IDRX",
            date: "2023-06-15T16:45:00Z",
            status: "completed",
            from: user.walletAddress,
            to: "IDR Conversion",
          },
        ];

        // Mock deposit address
        const mockDepositAddress = "idrx-deposit-123456789";

        setBalance(mockBalance);
        setTransactions(mockTransactions);
        setDepositAddress(mockDepositAddress);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [user.walletAddress]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();

    if (
      !depositAmount ||
      isNaN(parseFloat(depositAmount)) ||
      parseFloat(depositAmount) <= 0
    ) {
      alert("Please enter a valid amount");
      return;
    }

    setOperationLoading(true);

    try {
      // In a real app, this would call the IDRX service
      console.log(`Depositing ${depositAmount} IDR to IDRX`);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update balance (for demo)
      const amount = parseFloat(depositAmount);
      setBalance((prev) => ({
        ...prev,
        idrx: prev.idrx + amount,
      }));

      // Add transaction to history
      const newTransaction = {
        id: `tx-${Date.now()}`,
        type: "deposit",
        amount: amount,
        currency: "IDRX",
        date: new Date().toISOString(),
        status: "completed",
        from: "IDR Conversion",
        to: user.walletAddress,
      };

      setTransactions((prev) => [newTransaction, ...prev]);

      // Show success message
      alert("Deposit successful!");

      // Reset form
      setDepositAmount("");
    } catch (error) {
      console.error("Error depositing funds:", error);
      alert("Error depositing funds. Please try again.");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();

    if (
      !withdrawAmount ||
      isNaN(parseFloat(withdrawAmount)) ||
      parseFloat(withdrawAmount) <= 0
    ) {
      alert("Please enter a valid amount");
      return;
    }

    if (parseFloat(withdrawAmount) > balance.idrx) {
      alert("Insufficient balance");
      return;
    }

    // Validate bank details
    if (
      !bankDetails.accountName ||
      !bankDetails.accountNumber ||
      !bankDetails.bankName
    ) {
      alert("Please fill in all required bank details");
      return;
    }

    setOperationLoading(true);

    try {
      // In a real app, this would call the IDRX service
      console.log(`Withdrawing ${withdrawAmount} IDRX to IDR`, bankDetails);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update balance (for demo)
      const amount = parseFloat(withdrawAmount);
      setBalance((prev) => ({
        ...prev,
        idrx: prev.idrx - amount,
      }));

      // Add transaction to history
      const newTransaction = {
        id: `tx-${Date.now()}`,
        type: "withdraw",
        amount: amount,
        currency: "IDRX",
        date: new Date().toISOString(),
        status: "completed",
        from: user.walletAddress,
        to: "IDR Conversion",
        reference: `Bank transfer to ${bankDetails.accountName}`,
      };

      setTransactions((prev) => [newTransaction, ...prev]);

      // Show success message
      alert(
        "Withdrawal initiated successfully! Funds will be transferred to your bank account.",
      );

      // Reset form
      setWithdrawAmount("");
      setBankDetails({
        accountName: "",
        accountNumber: "",
        bankName: "",
        bankBranch: "",
      });
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      alert("Error withdrawing funds. Please try again.");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleConvertSubmit = async (e) => {
    e.preventDefault();

    if (
      !convertAmount ||
      isNaN(parseFloat(convertAmount)) ||
      parseFloat(convertAmount) <= 0
    ) {
      alert("Please enter a valid amount");
      return;
    }

    if (
      convertDirection === "idrxtoidr" &&
      parseFloat(convertAmount) > balance.idrx
    ) {
      alert("Insufficient IDRX balance");
      return;
    }

    setOperationLoading(true);

    try {
      // In a real app, this would call the IDRX service
      console.log(
        `Converting ${convertAmount} ${convertDirection === "idrtoidrx" ? "IDR to IDRX" : "IDRX to IDR"}`,
      );

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update balance (for demo)
      const amount = parseFloat(convertAmount);
      if (convertDirection === "idrtoidrx") {
        setBalance((prev) => ({
          ...prev,
          idrx: prev.idrx + amount,
        }));

        // Add transaction to history
        const newTransaction = {
          id: `tx-${Date.now()}`,
          type: "deposit",
          amount: amount,
          currency: "IDRX",
          date: new Date().toISOString(),
          status: "completed",
          from: "IDR Conversion",
          to: user.walletAddress,
        };

        setTransactions((prev) => [newTransaction, ...prev]);
      } else {
        setBalance((prev) => ({
          ...prev,
          idrx: prev.idrx - amount,
        }));

        // Add transaction to history
        const newTransaction = {
          id: `tx-${Date.now()}`,
          type: "withdraw",
          amount: amount,
          currency: "IDRX",
          date: new Date().toISOString(),
          status: "completed",
          from: user.walletAddress,
          to: "IDR Conversion",
        };

        setTransactions((prev) => [newTransaction, ...prev]);
      }

      // Show success message
      alert("Conversion successful!");

      // Reset form
      setConvertAmount("");
    } catch (error) {
      console.error("Error converting funds:", error);
      alert("Error converting funds. Please try again.");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(user.walletAddress);
    alert("Wallet address copied to clipboard!");
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "deposit":
        return <i className="fas fa-arrow-down text-success"></i>;
      case "withdraw":
        return <i className="fas fa-arrow-up text-danger"></i>;
      case "purchase":
        return <i className="fas fa-shopping-cart text-primary"></i>;
      case "sale":
        return <i className="fas fa-tag text-info"></i>;
      default:
        return <i className="fas fa-exchange-alt"></i>;
    }
  };

  if (loading) {
    return <div className="loading">Loading wallet data...</div>;
  }

  return (
    <div className="wallet-container">
      <div className="page-header">
        <h1>IDRX Wallet</h1>
        <p>Manage your IDRX stablecoin for carbon credit transactions</p>
      </div>

      <div className="wallet-address-box">
        <h3>Your Wallet Address</h3>
        <div className="address-display">
          <span className="address">{user.walletAddress}</span>
          <button className="copy-button" onClick={handleCopyAddress}>
            <i className="fas fa-copy"></i>
          </button>
        </div>
      </div>

      <div className="wallet-tabs">
        <button
          className={`tab-button ${activeTab === "balance" ? "active" : ""}`}
          onClick={() => handleTabChange("balance")}
        >
          Balance & Transactions
        </button>
        <button
          className={`tab-button ${activeTab === "deposit" ? "active" : ""}`}
          onClick={() => handleTabChange("deposit")}
        >
          Deposit
        </button>
        <button
          className={`tab-button ${activeTab === "withdraw" ? "active" : ""}`}
          onClick={() => handleTabChange("withdraw")}
        >
          Withdraw
        </button>
        <button
          className={`tab-button ${activeTab === "convert" ? "active" : ""}`}
          onClick={() => handleTabChange("convert")}
        >
          Convert
        </button>
      </div>

      <div className="wallet-content">
        {activeTab === "balance" && (
          <div className="balance-section">
            <div className="balance-cards">
              <div className="balance-card idrx">
                <h3>IDRX Balance</h3>
                <div className="balance-amount">
                  <span className="currency-symbol">Rp</span>
                  <span className="amount">
                    {balance.idrx.toLocaleString()}
                  </span>
                </div>
                <p className="balance-info">1 IDRX = 1 IDR</p>
              </div>

              <div className="balance-card lisk">
                <h3>Lisk Balance</h3>
                <div className="balance-amount">
                  <span className="amount">{balance.lisk.toFixed(2)}</span>
                  <span className="currency-symbol">LSK</span>
                </div>
                <p className="balance-info">Used for network fees</p>
              </div>
            </div>

            <div className="transaction-history">
              <h3>Transaction History</h3>
              <div className="transactions-table-container">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="type-cell">
                            {getTransactionIcon(transaction.type)}
                            <span>
                              {transaction.type.charAt(0).toUpperCase() +
                                transaction.type.slice(1)}
                            </span>
                          </td>
                          <td
                            className={`amount-cell ${transaction.type === "withdraw" ? "negative" : ""}`}
                          >
                            {transaction.type === "withdraw" ? "- " : ""}
                            Rp {transaction.amount.toLocaleString()}
                          </td>
                          <td>
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td>
                            <span
                              className={`status-badge ${transaction.status}`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="details-cell">
                            {transaction.reference ||
                              `${transaction.type === "withdraw" ? "To" : "From"}: ${
                                transaction.type === "withdraw"
                                  ? transaction.to
                                  : transaction.from
                              }`}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-data">
                          No transactions yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "deposit" && (
          <div className="deposit-section">
            <div className="section-info">
              <h3>Deposit IDRX</h3>
              <p>Convert IDR to IDRX to use in the carbon marketplace</p>
            </div>

            <div className="deposit-options">
              <div className="deposit-card">
                <h4>Bank Transfer (IDR)</h4>
                <p>Transfer IDR from your bank account and convert to IDRX</p>
                <form onSubmit={handleDepositSubmit} className="deposit-form">
                  <div className="form-group">
                    <label htmlFor="depositAmount">Amount (IDR)</label>
                    <input
                      type="number"
                      id="depositAmount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Enter amount in IDR"
                      min="10000"
                      required
                    />
                    <small>Minimum deposit: Rp 10,000</small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={operationLoading}
                  >
                    {operationLoading ? "Processing..." : "Deposit"}
                  </button>
                </form>
              </div>

              <div className="deposit-card">
                <h4>Deposit Address</h4>
                <p>
                  If you already have IDRX, you can send it to this address:
                </p>
                <div className="deposit-address">
                  <span>{depositAddress}</span>
                  <button
                    className="copy-button"
                    onClick={() => {
                      navigator.clipboard.writeText(depositAddress);
                      alert("Deposit address copied to clipboard!");
                    }}
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
                <div className="qr-code">
                  <div className="qr-placeholder">QR Code</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "withdraw" && (
          <div className="withdraw-section">
            <div className="section-info">
              <h3>Withdraw IDRX</h3>
              <p>Convert IDRX back to IDR and withdraw to your bank account</p>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="withdraw-form">
              <div className="form-group">
                <label htmlFor="withdrawAmount">Amount (IDRX)</label>
                <input
                  type="number"
                  id="withdrawAmount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount in IDRX"
                  min="50000"
                  max={balance.idrx}
                  required
                />
                <div className="amount-details">
                  <small>Minimum withdrawal: Rp 50,000</small>
                  <small>
                    Available balance: Rp {balance.idrx.toLocaleString()}
                  </small>
                </div>
              </div>

              <div className="bank-details">
                <h4>Bank Account Details</h4>

                <div className="form-group">
                  <label htmlFor="accountName">Account Holder Name</label>
                  <input
                    type="text"
                    id="accountName"
                    value={bankDetails.accountName}
                    onChange={(e) =>
                      setBankDetails({
                        ...bankDetails,
                        accountName: e.target.value,
                      })
                    }
                    placeholder="Enter account holder name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="accountNumber">Account Number</label>
                  <input
                    type="text"
                    id="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={(e) =>
                      setBankDetails({
                        ...bankDetails,
                        accountNumber: e.target.value,
                      })
                    }
                    placeholder="Enter account number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bankName">Bank Name</label>
                  <select
                    id="bankName"
                    value={bankDetails.bankName}
                    onChange={(e) =>
                      setBankDetails({
                        ...bankDetails,
                        bankName: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">-- Select a bank --</option>
                    <option value="BCA">BCA</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                    <option value="CIMB Niaga">CIMB Niaga</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="bankBranch">Bank Branch (Optional)</label>
                  <input
                    type="text"
                    id="bankBranch"
                    value={bankDetails.bankBranch}
                    onChange={(e) =>
                      setBankDetails({
                        ...bankDetails,
                        bankBranch: e.target.value,
                      })
                    }
                    placeholder="Enter bank branch"
                  />
                </div>
              </div>

              <div className="withdraw-info">
                <p>
                  <strong>Note:</strong> Withdrawals are typically processed
                  within 1-2 business days. A small processing fee may apply.
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={operationLoading}
              >
                {operationLoading
                  ? "Processing..."
                  : "Withdraw to Bank Account"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "convert" && (
          <div className="convert-section">
            <div className="section-info">
              <h3>Convert Currency</h3>
              <p>Convert between IDR and IDRX</p>
            </div>

            <form onSubmit={handleConvertSubmit} className="convert-form">
              <div className="form-group">
                <label htmlFor="convertDirection">Conversion Direction</label>
                <div className="convert-direction-toggle">
                  <label
                    className={`direction-option ${convertDirection === "idrtoidrx" ? "active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="convertDirection"
                      value="idrtoidrx"
                      checked={convertDirection === "idrtoidrx"}
                      onChange={() => setConvertDirection("idrtoidrx")}
                    />
                    <span>IDR to IDRX</span>
                  </label>
                  <label
                    className={`direction-option ${convertDirection === "idrxtoidr" ? "active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="convertDirection"
                      value="idrxtoidr"
                      checked={convertDirection === "idrxtoidr"}
                      onChange={() => setConvertDirection("idrxtoidr")}
                    />
                    <span>IDRX to IDR</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="convertAmount">
                  Amount ({convertDirection === "idrtoidrx" ? "IDR" : "IDRX"})
                </label>
                <input
                  type="number"
                  id="convertAmount"
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(e.target.value)}
                  placeholder={`Enter amount in ${convertDirection === "idrtoidrx" ? "IDR" : "IDRX"}`}
                  min="10000"
                  max={
                    convertDirection === "idrxtoidr" ? balance.idrx : undefined
                  }
                  required
                />
                <div className="amount-details">
                  <small>Minimum conversion: Rp 10,000</small>
                  {convertDirection === "idrxtoidr" && (
                    <small>
                      Available IDRX balance: Rp {balance.idrx.toLocaleString()}
                    </small>
                  )}
                </div>
              </div>

              <div className="conversion-details">
                <div className="conversion-rate">
                  <span>Conversion Rate:</span>
                  <span>1 IDR = 1 IDRX</span>
                </div>

                <div className="conversion-result">
                  <span>You will receive:</span>
                  <span>
                    {convertAmount && !isNaN(parseFloat(convertAmount))
                      ? parseFloat(convertAmount).toLocaleString()
                      : "0"}{" "}
                    {convertDirection === "idrtoidrx" ? "IDRX" : "IDR"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={operationLoading}
              >
                {operationLoading ? "Processing..." : "Convert"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
