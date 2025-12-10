import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NeonButton from "../components/NeonButton";

export default function Wishlist() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  async function loadGames() {
    const res = await fetch("/api/games");
    const data = await res.json();
    setGames(data.filter((g) => g.listType === "Wishlist"));
  }

  async function handleDelete(id) {
    await fetch(`/api/games/${id}`, { method: "DELETE" });
    loadGames();
  }

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <div className="cardPage wide">
      <h2 className="pageHeader">Wishlist</h2>

      <table className="neonTable">
        <thead>
          <tr>
            <th>Cover Art</th>
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
              <td>
                {g.coverArt ? (
                  <img
                    src={g.coverArt}
                    alt={`${g.title} cover`}
                    style={{
                      width: "auto",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "6px"
                    }}
                  />
                ) : (
                  "None"
                )}
              </td>
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


