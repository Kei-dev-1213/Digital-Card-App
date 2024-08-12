import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("テスト", () => {
  it("テスト", () => {
    render(<App />);
    expect(true).toEqual(true);
  });
});
