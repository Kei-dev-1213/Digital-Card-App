import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Top } from "./Top";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("初期表示テスト", () => {
  test("[正常系]タイトルが表示されていること", () => {
    // 実行
    render(<Top />);
    const pageTitle = screen.getByText("デジタル名刺アプリ");

    // 検証
    expect(pageTitle).toBeInTheDocument();
  });
  test("[正常系]名刺を見るボタンが非活性であること", () => {
    // 実行
    render(<Top />);
    const searchButton = screen.getByText("名刺を見る");

    // 検証
    expect(searchButton).toBeDisabled();
  });
});

describe("名刺を見るボタン押下テスト", () => {
  test("[正常系]ユーザーID入力後、ボタン押下で正常に画面遷移すること", async () => {
    // モック化
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    // 実行
    render(<Top />);
    const inputUserId = screen.getByTestId("input-user-id");
    const searchButton = screen.getByText("名刺を見る");
    await userEvent.type(inputUserId, "userIdText01");
    fireEvent.click(searchButton);

    // 検証
    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledWith("/cards/userIdText01");
    });
  });

  test("[異常系]ユーザーIDに半角英数以外の文字列を入力してボタン押下でエラーメッセージが表示されること", async () => {
    // モック化
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    // 実行
    render(<Top />);
    const inputUserId = screen.getByTestId("input-user-id");
    const searchButton = screen.getByText("名刺を見る");
    await userEvent.type(inputUserId, "全角文字列");
    fireEvent.click(searchButton);

    // 検証
    await waitFor(async () => {
      const errorMessage = screen.getByText("ユーザーIDは半角英数字で入力してください。");
      expect(errorMessage).toBeInTheDocument();
      expect(navigate).toHaveBeenCalledTimes(0);
    });
  });
});

describe("新規登録はこちらリンク押下テスト", () => {
  test("[正常系]新規登録はこちらボタン押下で正常に画面遷移すること", async () => {
    // モック化
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    // 実行
    render(<Top />);
    const linkToRegist = screen.getByText("新規登録はこちら");
    fireEvent.click(linkToRegist);

    // 検証
    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledWith("/cards/register");
    });
  });
});
