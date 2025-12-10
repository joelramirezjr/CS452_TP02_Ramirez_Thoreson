import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeonButton from "../components/NeonButton";

export default function AddGame() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    console: "",
    condition: "",
    listType: "Collection",
    notes: "",
    coverArt: ""
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, coverArt: reader.result });
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const saved = await res.json();
      navigate(saved.listType === "Wishlist" ? "/wishlist" : "/collection");
    } catch (err) {
      alert("Error adding game");
    }
  }

  return (
    <div className="cardPage">
      <h2 className="pageHeader">Add a Game</h2>

      <form className="formNeon" onSubmit={handleSubmit}>
        
        <label>Title
          <input name="title" value={formData.title} onChange={handleChange} />
        </label>

        <label>Console
          <input name="console" value={formData.console} onChange={handleChange} />
        </label>

        {/* Updated to dropdown instead of text input */}
        <label>Condition
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select Condition</option>
            <option value="New/Sealed">New/Sealed</option>
            <option value="Like New">Like New</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </label>

        <label>Add to
          <select name="listType" value={formData.listType} onChange={handleChange}>
            <option value="Collection">My Collection</option>
            <option value="Wishlist">Wishlist</option>
          </select>
        </label>

        <label>Cover Art
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        <label>Notes
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>

        <div className="bottomBtns">
          <button className="neonBtn">Save Game</button>
          <NeonButton text="My Collection" onClick={(e) => { e.preventDefault(); navigate("/collection")}} />
          <NeonButton text="Wishlist" onClick={(e) => { e.preventDefault(); navigate("/wishlist")}} />
        </div>
      </form>
    </div>
  );
}



