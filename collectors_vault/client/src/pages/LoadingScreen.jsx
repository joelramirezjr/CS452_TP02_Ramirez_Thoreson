import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loadingGif from "../assets/loading.gif"; // adjust path if needed

export default function LoadingScreen() {
  const navigate = useNavigate();

  // Delay then redirect
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/add");
    }, 3000); // 3 ish-seconds

    return () => clearTimeout(timer);
  }, [navigate]);

    return (
    <div className="loadingWrap">
        <div className="loadingContent">
        <img src={loadingGif} alt="Loading" className="loadingGif" />
        <h2 className="loadingText">Loading...</h2>
        </div>
    </div>
    );

}
