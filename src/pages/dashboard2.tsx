import "./css/dashboard.css"
import transfer from "../assets/transfer.png"
import loan from "../assets/loan.png"
import menu from "../assets/menu.png"
import deposit from "../assets/deposit.png"
import info from "../assets/info.png"
import { toast } from 'react-toastify'
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom"

export default function Dashboard() {

   const transactions = [
    { title: "Interest Credit", date: "Dec 31, 2013", amount: 3250, type: "credit" },
    { title: "Wire Transfer – Legal Advisory (Hughes & Law Group)", date: "Jul 17, 2013", amount: 45000, type: "debit" },
    { title: "Account Maintenance Fee", date: "Dec 15, 2012", amount: 600, type: "debit" },
    { title: "Payment – Greenwood Memorial Services", date: "Jan 25, 2011", amount: 38700, type: "debit" },
    { title: "Deposit – Sale of Property (Houston, TX)", date: "Apr 14, 2010", amount: 2500000, type: "credit" },
    { title: "Deposit – Proceeds from Stock Liquidation (Charles Schwab)", date: "Feb 02, 2010", amount: 1000000, type: "credit" },
    { title: "Deposit – Insurance Payout (Liberty Mutual)", date: "Jan 13, 2010", amount: 500000, type: "credit" },
    { title: "Opening Balance", date: "Jan 10, 2010. Checking", amount: 0, type: "credit" },
    // add more sample data for demo
    { title: "ATM Withdrawal", date: "Feb 12, 2014", amount: 1200, type: "debit" },
    { title: "Transfer from Savings", date: "Mar 01, 2014", amount: 7000, type: "credit" },
    { title: "Rent Payment", date: "Mar 05, 2014", amount: 35000, type: "debit" },
    { title: "Deposit – Freelance Payment", date: "Apr 09, 2014", amount: 4200, type: "credit" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Slice transactions for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTxns = transactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
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

        <p style={{ margin: "20px 0", fontWeight: "bold" }}>Welcome, Betty</p>
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

                <div style={{ marginRight: 12 }}>
                  <p>$102,120.00</p>
                  <p><small>Available</small></p>
                </div>
              </div>
              <div className="acc-summary">
                <div>
                  <p>Savings</p>
                  <p> <small> x3183 </small></p>
                </div>

                <div>
                  <p>$3,916,950.00</p>
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
                <div className="items" style={{ cursor: "pointer" }} onClick={() => toast.error("$14,000.00 tax clearance required.")}>
                  <div className="item-img">
                    <img src={deposit} alt="" />
                  </div>
                  <small>Deposit</small>
                </div>
                <div className="items" style={{ cursor: "pointer" }} onClick={() => toast.error("$14,000.00 tax clearance required.")}>
                  <div className="item-img">
                    <img src={loan} alt="" />
                  </div>
                  <small>Loan</small>
                </div>
                <Link to={"/dashboard/personal-details"}>
                <div className="items" style={{ cursor: "pointer" }}>
                  <div className="item-img">
                    <img src={info} alt="" />
                  </div>
                  <small>Profile</small>
                </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="transactions">
            <div style={{ fontSize: 18, color: "gray" }}>
              <p style={{ fontWeight: "bold" }}>Transactions</p>
            </div>
            <br />

            {/* Credit Txn - Interest Credit */}
            <div className="txn-item" style={{ marginRight: 10 }}>
              <div>
                <p style={{ fontWeight: "bold" }}>Interest Credit</p>
                <small style={{ color: "gray" }}>Dec 31, 2013</small>
              </div>
              <div style={{ fontWeight: "bold", color: "green" }}>
                $3,250.00
              </div>
            </div>

            {/* Debit Txn - Legal Advisory Fee */}
            <div className="txn-item" style={{ marginRight: 10 }}>
              <div>
                <p style={{ fontWeight: "bold" }}>Wire Transfer – Legal Advisory (Hughes & Law Group)</p>
                <small style={{ color: "gray" }}>Jul 17, 2013</small>
              </div>
              <div style={{ fontWeight: "bold", color: "red" }}>
                $45,000.00
              </div>
            </div>

            {/* Debit Txn - Bank Service Charges */}
            <div className="txn-item" style={{ marginRight: 10 }}>
              <div>
                <p style={{ fontWeight: "bold" }}>Account Maintenance Fee</p>
                <small style={{ color: "gray" }}>Dec 15, 2012</small>
              </div>
              <div style={{ fontWeight: "bold", color: "red" }}>
                $600.00
              </div>
            </div>

            {/* Debit Txn - Funeral Home Payment */}
            <div className="txn-item" style={{ marginRight: 10 }}>
              <div>
                <p style={{ fontWeight: "bold" }}>Payment – Greenwood Memorial Services</p>
                <small style={{ color: "gray" }}>Jan 25, 2011</small>
              </div>
              <div style={{ fontWeight: "bold", color: "red" }}>
                $38,700.00
              </div>
            </div>

            {/* Credit Txn - Property Sale */}
            <div className="txn-item" style={{ marginRight: 10 }}>
              <div>
                <p style={{ fontWeight: "bold" }}>Deposit – Sale of Property (Houston, TX)</p>
                <small style={{ color: "gray" }}>Apr 14, 2010</small>
              </div>
              <div style={{ fontWeight: "bold", color: "green" }}>
                $2,500,000.00
              </div>
            </div>

            {/* Credit Txn - Stock Liquidation */}
            <div className="txn-item" style={{ marginRight: 10 }}>
              <div>
                <p style={{ fontWeight: "bold" }}>Deposit – Proceeds from Stock Liquidation (Charles Schwab)</p>
                <small style={{ color: "gray" }}>Feb 02, 2010</small>
              </div>
              <div style={{ fontWeight: "bold", color: "green" }}>
                $1,000,000.00
              </div>
            </div>

            {/* Credit Txn - Insurance Payout */}
            <div className="txn-item" style={{ marginRight: 10 }}>
              <div>
                <p style={{ fontWeight: "bold" }}>Deposit – Insurance Payout (Liberty Mutual)</p>
                <small style={{ color: "gray" }}>Jan 13, 2010</small>
              </div>
              <div style={{ fontWeight: "bold", color: "green" }}>
                $500,000.00
              </div>
            </div>

            {/* Credit Txn - Opening Balance */}
            <div className="txn-item" style={{ marginRight: 10 }}>
              <div>
                <p style={{ fontWeight: "bold" }}>Opening Balance</p>
                <small style={{ color: "gray" }}>Jan 10, 2010. Checking</small>
              </div>
              <div style={{ fontWeight: "bold", color: "green" }}>
                -
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  )
}
