import "./css/dashboard.css"
import transfer from "../assets/transfer.png"
import loan from "../assets/loan.png"
import menu from "../assets/menu.png"
import deposit from "../assets/deposit.png"
import info from "../assets/info.png"
import { toast } from 'react-toastify'
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom"
import { useState } from "react"
import transactions from "../assets/transactions.json";

export default function Dashboard() {

  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Slice transactions for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTxns = transactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page:any) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="dashboard-nav">
        <div style={{ height: 30, marginLeft: 20 }}>
          <img style={{ height: "100%", objectFit: "contain" }} src={menu} alt="" />
        </div>
        <img src={logo} width={80} alt="" />
        {/* <div className="audiowide">TrustFund Home</div> */}

        <div>
          <Link style={{ marginRight: 20, color: "white" }} to={"/login"}>Logout</Link>
        </div>

      </div>

      <div className='container'>

        <p style={{ margin: "20px 0", fontWeight: "bold" }}>Welcome, David</p>
        <div className="dashboard-container">
          <div>
            <div className="accounts">
              <div style={{ marginLeft: 10, fontSize: 20, color: "gray" }}>
                <p style={{ fontWeight: "bold" }}>Accounts</p>
              </div>
              <div className="acc-summary">
                <div>
                  <p>Checking</p>
                  <p> <small> x3527 </small></p>
                </div>

                <div style={{ marginRight: 2 }}>
                  <p>$3,003,920.00</p>
                  <p><small>Available</small></p>
                </div>
              </div>
              <div className="acc-summary">
                <div>
                  <p>Savings (Inheritance)</p>
                  <p> <small> x3183 </small></p>
                </div>

                <div>
                  <p>$15,916,950.00</p>
                  <p><small>Available</small></p>
                </div>
              </div>
              {/* <div style={{backgroundColor:"#002d7b", margin:"0 20px", padding:"10px"}}>
                        Transactions
                    </div> */}
            </div>

            <div className="dashboard-options">
              {/* <p style={{ textAlign: "center", fontSize: 20, color: "gray", fontWeight: "bold" }} className="audiowide">Arvest</p> */}
              <div className="dash-options">
                <Link to="/dashboard/transfer">
                  <div className="items" style={{ cursor: "pointer" }}>
                    <div className="item-img">
                      <img src={transfer} alt="" />
                    </div>
                    <small>Transfer</small>
                  </div>
                </Link>
                <div className="items" style={{ cursor: "pointer" }} onClick={() => toast.error("$330,000.00 tax clearance required.")}>
                  <div className="item-img">
                    <img src={deposit} alt="" />
                  </div>
                  <small>Deposit</small>
                </div>
                <div className="items" style={{ cursor: "pointer" }} onClick={() => toast.error("$330,000.00 tax clearance required.")}>
                  <div className="item-img">
                    <img src={loan} alt="" />
                  </div>
                  <small>Loan</small>
                </div>
                
                <div className="items" style={{ cursor: "pointer" }} onClick={() => toast.error("$330,000.00 tax clearance required.")}>
                  <div className="item-img">
                    <img src={info} alt="" />
                  </div>
                  <small>Profile</small>
                </div>
                
              </div>
            </div>
          </div>
        <div className="transactions">
      <div style={{ fontSize: 18, color: "gray" }}>
        <p style={{ fontWeight: "bold" }}>Transactions</p>
      </div>
      <br />

      {currentTxns.map((txn, index) => (
        <div className="txn-item" key={index} style={{ marginBottom: 10 }}>
          <div>
            <p style={{ fontWeight: "bold" }}>{txn.title}</p>
            <small style={{ color: "gray" }}>{txn.date}</small>
          </div>
          <div
            style={{
              fontWeight: "bold",
              color: txn.type === "credit" ? "green" : "red",
            }}
          >
            {txn.amount === 0 ? "-" : `$${txn.amount.toLocaleString()}`}
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 10 }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ padding: "6px 10px", borderRadius: 5, cursor: "pointer" }}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            style={{
              padding: "6px 10px",
              borderRadius: 5,
              backgroundColor: currentPage === i + 1 ? "lightgray" : "white",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: "6px 10px", borderRadius: 5, cursor: "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
        </div>
      </div>
    </div>
  )
}
