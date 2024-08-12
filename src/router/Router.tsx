import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { Cards } from "../pages/cards/Cards";
import { Page404 } from "../pages/Page404";
import { Register } from "../pages/cards/Register";

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/cards/:id" element={<Cards />} />
      <Route path="/cards/register" element={<Register />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
