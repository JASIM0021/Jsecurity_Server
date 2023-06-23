/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useLayoutEffect } from "react";
import config from "../../../../config";

const CallingScreen = ({ phoneNumber, onHangup, sim }) => {
  const makeCall = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const update = axios
      .post(`${config.api_url}/api/command`, {
        call: {
          status: true,
          number: phoneNumber,
          sim: Number(sim),
        },
        cmdId: user?.id,
      })
      .then((res) => {
        console.log("res", res);
      });
  };
  useEffect(() => {
    makeCall();
    console.log("calling...");
  }, []);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Calling {phoneNumber}...</h2>
      <button className="btn btn-primary bg-red-500 rounded" onClick={onHangup}>
        Hang Up
      </button>
    </div>
  );
};

export default CallingScreen;
