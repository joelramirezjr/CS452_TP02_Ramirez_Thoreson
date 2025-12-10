import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import AddGame from "./pages/AddGame";
import Collection from "./pages/Collection";
import Wishlist from "./pages/Wishlist";
import EditGame from "./pages/EditGame";
import LoadingScreen from "./pages/LoadingScreen";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add" element={<AddGame />} />
          <Route path="collection" element={<Collection />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="edit/:id" element={<EditGame />} />
          <Route path="/loading" element={<LoadingScreen />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}