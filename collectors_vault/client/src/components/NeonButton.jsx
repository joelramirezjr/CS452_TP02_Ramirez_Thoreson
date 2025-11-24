import React from "react";

export default function NeonButton({ text, onClick }) {
  return (
    <button className="neonBtn" onClick={onClick}>
      {text}
    </button>
  );
}
