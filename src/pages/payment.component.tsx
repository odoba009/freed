import { useState } from "react";

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
    const options: { id: "card" | "bank" | "wire"; label: string }[] = [
        { id: "card", label: "💳 Card" },
        { id: "bank", label: "🏦 Bank" },
        { id: "wire", label: "🔗 Wire Transfer" },
    ];

    const handleSelect = (optionId: "card" | "bank" | "wire") => {
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

  
  // const [isLoading, setIsLoading] = useState(false)


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Select Payment Option</h2>

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
                <form>
                    <br />
                    <div className="input-field">
                <label htmlFor="">Card Number</label>
                <input type="text" name="schoolNumber" minLength={16} maxLength={19} required onChange={handleCardInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="">Exp</label>
                <input type="text" maxLength={7} required  name="resumptionDate" onChange={handleExpDate}/>
            </div>
            <div className="input-field">
                <label htmlFor="">CVV</label>
                <input type="text" maxLength={4} name="entryCode" required onChange={handleInputChange}/>
            </div>
<br />
            <div style={{ "marginTop": "20px;" }} className="field is-grouped">
              <div style={{ "width": "100%" }} className="control">
                <div className="gradient-button">
                  {!false ?
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
