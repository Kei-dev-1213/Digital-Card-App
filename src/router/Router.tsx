import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { Card } from "../pages/card/Card";
import { Page404 } from "../pages/Page404";

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/cards/:id" element={<Card />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
