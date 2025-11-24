import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeonButton from "../components/NeonButton";

export default function AddGame() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    console: "",
    condition: "",
    listType: "Collection",
    notes: ""
  });

  // Handle form input changes
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle form submission using async/await/fetch
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const saved = await res.json();

      // Navigate based on listType selected 
      if (saved.listType === "Wishlist") navigate("/wishlist");
      else navigate("/collection");
      // catch error section to help with debugging
    } catch (err) {
      alert("Error adding game");
    }
  }

  return (
    <div className="cardPage">
      <h2 className="pageHeader">Add a Game</h2>

      <form className="formNeon" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={formData.title} onChange={handleChange} />
        </label>

        <label>
          Console
          <input name="console" value={formData.console} onChange={handleChange} />
        </label>

        <label>
          Condition
          <input name="condition" value={formData.condition} onChange={handleChange} />
        </label>

        <label>
          Add to
          <select name="listType" value={formData.listType} onChange={handleChange}>
            <option value="Collection">My Collection</option>
            <option value="Wishlist">Wishlist</option>
          </select>
        </label>

        <label>
          Notes
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>

        <div className="bottomBtns">
            <button className="neonBtn">Save Game</button>
            <div>
                <NeonButton text="My Collection" onClick={(e) => {
                    e.preventDefault();
                    navigate("/collection")
                    }} 
                />
                <NeonButton text="Wishlist" onClick={(e) => {
                    e.preventDefault();
                    navigate("/wishlist")
                    }} 
                />
            </div>
        </div>
        
      </form>
    </div>
  );
}
