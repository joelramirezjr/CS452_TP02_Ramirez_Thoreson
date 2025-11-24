import React from "react";
import { useNavigate } from "react-router-dom";
import NeonButton from "../components/NeonButton";
import "../App.css";

//Home page/Landing Page
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="homeBg">  {/* this is the background image */}
      <div className="homeWrap">
        <h1 className="titleBig">Collector’s Vault</h1>
        <p className="subtitle">Manage your retro game collection</p>

        <div className="btnColumn">
          <NeonButton text="Start" onClick={() => navigate("/add")} />
          <NeonButton text="My Collection" onClick={() => navigate("/collection")} />
          <NeonButton text="Wishlist" onClick={() => navigate("/wishlist")} />
        </div>
      </div>
    </div>
  );
}
