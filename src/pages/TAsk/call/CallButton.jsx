import React from 'react';

const CallButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-primary w-full bg-green-500">
      Call
    </button>
  );
};

export default CallButton;
