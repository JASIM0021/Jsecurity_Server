import React, { useState } from "react";
import CallingScreen from "./CallingScreen";
import CustomModel from "../../../components/common/CustomModel";
import axios from "axios";
import CallButton from "./CallButton";
import config from "../../../../config";

const CallScreen = ({ open, setOpen }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedSim, setSelectedSim] = useState("");

  const handleCall = async () => {
    if (phoneNumber.length < 10) {
      const input = prompt(
        "Wrong phone number Please enter a valid phone number"
      );
      console.log("input", input);
      await setPhoneNumber(input.toString()).then(() => {
        if (input.length < 10) {
          setIsCalling(true);
        } else {
          handleCall();
        }
      });
    }
    setIsCalling(true);
  };

  const endCall = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const update = axios
      .post(`${config.api_url}/api/command`, {
        call: {
          status: false,
        },
        cmdId: user?.id,
      })
      .then((res) => {
        console.log("res", res);
      });
  };

  const handleHangup = () => {
    setIsCalling(false);
    endCall();

    setPhoneNumber("");
  };

  const handleNumberInput = (number) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber((prevNumber) => prevNumber + number);
    }
  };

  const handleDelete = () => {
    setPhoneNumber((prevNumber) => prevNumber.slice(0, -1));
  };
  const handleSimSelect = (event) => {
    setSelectedSim(event.target.value);
  };

  return (
    <CustomModel open={open} setOpen={setOpen} title="Make a Call">
      <div className="min-h-screen flex justify-center items-center bg-gray-200">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8 space-y-6">
          {!isCalling ? (
            <div>
              <h1 className="text-2xl font-bold m-4">Phone Dialer</h1>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border border-gray-300 p-2 rounded m-4"
              />
              <div className="grid grid-cols-3 gap-2 ">
                <button
                  onClick={() => handleNumberInput("1")}
                  className="btn btn-primary"
                >
                  1
                </button>
                <button
                  onClick={() => handleNumberInput("2")}
                  className="btn btn-primary"
                >
                  2
                </button>
                <button
                  onClick={() => handleNumberInput("3")}
                  className="btn btn-primary"
                >
                  3
                </button>
                <button
                  onClick={() => handleNumberInput("4")}
                  className="btn btn-primary"
                >
                  4
                </button>
                <button
                  onClick={() => handleNumberInput("5")}
                  className="btn btn-primary"
                >
                  5
                </button>
                <button
                  onClick={() => handleNumberInput("6")}
                  className="btn btn-primary"
                >
                  6
                </button>
                <button
                  onClick={() => handleNumberInput("7")}
                  className="btn btn-primary"
                >
                  7
                </button>
                <button
                  onClick={() => handleNumberInput("8")}
                  className="btn btn-primary"
                >
                  8
                </button>
                <button
                  onClick={() => handleNumberInput("9")}
                  className="btn btn-primary"
                >
                  9
                </button>
                {/* Add more number buttons */}

                <button
                  onClick={handleDelete}
                  className="btn btn-primary  bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleNumberInput("0")}
                  className="btn btn-primary"
                >
                  0
                </button>
                {/* <button
                                    onClick={handleCall}
                                    className="btn btn-primary"
                                >
                                    Call
                                </button> */}

                <CallButton onClick={handleCall} />
              </div>
              <select
                value={selectedSim}
                onChange={handleSimSelect}
                className="btn btn-primary w-full bg-yellow-500"
              >
                <option value="">Select SIM</option>
                <option value={"0"}>SIM 1</option>
                <option value={"1"}>SIM 2</option>
              </select>
            </div>
          ) : (
            <CallingScreen
              phoneNumber={phoneNumber}
              onHangup={handleHangup}
              sim={selectedSim}
            />
          )}
        </div>
      </div>
    </CustomModel>
  );
};

export default CallScreen;
