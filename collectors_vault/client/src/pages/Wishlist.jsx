import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NeonButton from "../components/NeonButton";

export default function Wishlist() {
    // List of games to keep track of
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  async function loadGames() {
    const res = await fetch("/api/games");
    const data = await res.json();
    // Filter games to only include those in the wishlist
    setGames(data.filter((g) => g.listType === "Wishlist"));
  }

  // Function to handle the delete action for a game based on its ID
  async function handleDelete(id) {
    await fetch(`/api/games/${id}`, { method: "DELETE" });
    loadGames();
  }

  // Load games when the component mounts
  useEffect(() => {
    loadGames();
  }, []);

  return (
    <div className="cardPage wide">
      <h2 className="pageHeader">Wishlist</h2>

      <table className="neonTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Console</th>
            <th>Condition</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {games.map((g) => (
            <tr key={g._id}>
              <td>{g.title}</td>
              <td>{g.console}</td>
              <td>{g.condition}</td>
              <td>{g.notes}</td>
              <td>
                <button className="miniBtn" onClick={() => navigate(`/edit/${g._id}`)}>
                  Edit
                </button>
                <button className="miniBtn danger" onClick={() => handleDelete(g._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bottomBtns">
        <NeonButton text="Add more to my wishlist" onClick={() => navigate("/add")} />
        <NeonButton text="Home" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}
