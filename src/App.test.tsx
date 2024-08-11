import React from 'react';
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("テスト", () => {
  it("テスト", () => {
    render(<App />);
    const element = screen.getByText("テスト");
    expect(element).toBeInTheDocument();
  });
});
