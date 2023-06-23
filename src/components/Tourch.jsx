import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import config from "../../config";

const Tourch = ({ open, onClose }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const update = axios
      .post(`${config.api_url}/api/command`, {
        tourch: !isOn,
        cmdId: user?.id,
      })
      .then((res) => {
        console.log("tourch", isOn, res?.data);
      });
    setIsOn(!isOn);
  };
  return (
    <Dialog open={open} maxWidth="md" onClose={onclose} fullWidth>
      <DialogTitle>Tourch View</DialogTitle>
      <DialogContent>
        {/* Button with flashlight icon */}
        <button
          className={`flex items-center justify-center w-12 h-12 rounded-full ${
            isOn ? "bg-yellow-400" : "bg-gray-300"
          }`}
          onClick={handleToggle}
        >
          {/* Flashlight icons */}
          {isOn ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18a9 9 0 009-9h0a1 1 0 00-1-1h-2a1 1 0 00-1 1h0a7 7 0 11-7-7h0a1 1 0 00-1 1v2a1 1 0 001 1h0a1 1 0 001-1h2a1 1 0 001 1h0a9 9 0 10-9 9z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 15a5 5 0 005-5V4a3 3 0 00-6 0v6a5 5 0 005 5zm0 0V4a3 3 0 116 0v11M7 15h10M7 15a5 5 0 01-5-5V4a1 1 0 011-1h10a1 1 0 011 1v6a5 5 0 01-5 5h0z"
              />
            </svg>
          )}
        </button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Tourch;
