import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditGame() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    console: "",
    condition: "",
    listType: "Collection",
    notes: "",
    coverArt: ""
  });

  useEffect(() => {
    async function loadOne() {
      const res = await fetch("/api/games");
      const data = await res.json();
      const game = data.find((g) => g._id === id);
      if (game) setFormData(game);
    }
    loadOne();
  }, [id]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleImageUpload(e) {
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
    await fetch(`/api/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    formData.listType === "Wishlist" ? navigate("/wishlist") : navigate("/collection");
  }

  return (
    <div className="cardPage">
      <h2 className="pageHeader">Edit Game</h2>

      <form className="formNeon" onSubmit={handleSubmit}>

        <label>Title
          <input name="title" value={formData.title} onChange={handleChange} />
        </label>

        <label>Console
          <input name="console" value={formData.console} onChange={handleChange} />
        </label>

        {/* Updated to dropdown like AddGame */}
        <label>Condition
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
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

        <label>List
          <select name="listType" value={formData.listType} onChange={handleChange}>
            <option value="Collection">My Collection</option>
            <option value="Wishlist">Wishlist</option>
          </select>
        </label>

        {formData.coverArt && (
          <img
            src={formData.coverArt}
            alt="cover preview"
            width="120"
            style={{ margin: "10px 0", borderRadius: "8px" }}
          />
        )}

        <label>Update Cover Art
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>

        <label>Notes
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>

        <button className="neonBtn" type="submit">Save changes</button>
      </form>
    </div>
  );
}


