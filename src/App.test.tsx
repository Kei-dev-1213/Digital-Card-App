import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("テスト", () => {
  it("あい", () => {
    render(<App />);
    const element = screen.getByText("あいうえお");
    expect(element).toBeInTheDocument();
  });
});
