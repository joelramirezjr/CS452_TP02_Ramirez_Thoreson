import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditGame() {
    // Get game ID from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    console: "",
    condition: "",
    listType: "Collection",
    notes: ""
  });

  // Load existing game data on component mount
  useEffect(() => {
    // function to fetch game data for the selected game user wishes to edit (ID)
    async function loadOne() {
      const res = await fetch("/api/games");
      const data = await res.json();
      const game = data.find((g) => g._id === id);
      // if game found, set form data to existing game data
      if (game) setFormData(game);
    }
    loadOne();
  }, [id]);

  // Handle form input changes
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`/api/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    // Redirect based on list type
    if (formData.listType === "Wishlist") navigate("/wishlist");
    else navigate("/collection");
  }

  return (
    <div className="cardPage">
      <h2 className="pageHeader">Edit Game</h2>

      <form className="formNeon" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label>
          Console
          <input name="console" value={formData.console} onChange={handleChange} required />
        </label>

        <label>
          Condition
          <input name="condition" value={formData.condition} onChange={handleChange} />
        </label>

        <label>
          List
          <select name="listType" value={formData.listType} onChange={handleChange}>
            <option value="Collection">My Collection</option>
            <option value="Wishlist">Wishlist</option>
          </select>
        </label>

        <label>
          Notes
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>

        <button className="neonBtn" type="submit">Save changes</button>
      </form>
    </div>
  );
}
