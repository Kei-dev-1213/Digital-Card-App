import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes";

export const Router = memo(() => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
});
