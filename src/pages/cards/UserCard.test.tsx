import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import { DB } from "../../supabase";
import { UserCard } from "./UserCard";
import { UserCardInfo } from "../../type/UserCardInfo";
import { useNavigate } from "react-router-dom";

const initialUserCardInfo1 = new UserCardInfo(
  "1",
  "ユーザー名",
  "TypeScript",
  "<h1>自己紹介文です。</h1>",
  "github_id_01",
  "qiita_id_01",
  "x_id_01"
);

const initialUserCardInfo2 = new UserCardInfo("1", "ユーザー名", "TypeScript", "<h1>自己紹介文です。</h1>", "", "", "");

// モック化
jest.mock("react-router-dom", () => ({
  useParams: () => ({
    id: "1",
  }),
  useNavigate: jest.fn(),
}));
jest.mock("../../supabase", () => ({
  DB: {
    fetchUserSkillInfoFromUserId: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("初期表示テスト", () => {
  test("[正常系]ユーザー情報が表示されていること(各アイコンあり)", async () => {
    // モック化
    (DB.fetchUserSkillInfoFromUserId as jest.Mock).mockResolvedValue(initialUserCardInfo1);

    // 実行
    await act(async () => {
      render(<UserCard />);
    });

    // 検証
    const name = screen.getByText("名前:ユーザー名");
    const description = screen.getByText("自己紹介文です。");
    const skill = screen.getByText("TypeScript");
    const githubIcon = screen.getByTestId("github-link");
    const qiitaIcon = screen.getByTestId("qiita-link");
    const xIcon = screen.getByTestId("x-link");
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(skill).toBeInTheDocument();
    expect(githubIcon).toBeInTheDocument();
    expect(qiitaIcon).toBeInTheDocument();
    expect(xIcon).toBeInTheDocument();
    expect(githubIcon).toHaveAttribute("href", "https://github.com/github_id_01");
    expect(qiitaIcon).toHaveAttribute("href", "https://qiita.com/qiita_id_01");
    expect(xIcon).toHaveAttribute("href", "https://x.com/x_id_01");
  });

  test("[正常系]ユーザー情報が表示されていること(各アイコンなし)", async () => {
    // モック化
    (DB.fetchUserSkillInfoFromUserId as jest.Mock).mockResolvedValue(initialUserCardInfo2);

    // 実行
    await act(async () => {
      render(<UserCard />);
    });

    // 検証
    const name = screen.getByText("名前:ユーザー名");
    const description = screen.getByText("自己紹介文です。");
    const skill = screen.getByText("TypeScript");
    const githubIcon = screen.queryByTestId("github-link");
    const qiitaIcon = screen.queryByTestId("qiita-link");
    const xIcon = screen.queryByTestId("x-link");
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(skill).toBeInTheDocument();
    expect(githubIcon).not.toBeInTheDocument();
    expect(qiitaIcon).not.toBeInTheDocument();
    expect(xIcon).not.toBeInTheDocument();
  });

  test("[正常系]ローディングスピナーが表示されること", async () => {
    // モック化
    (DB.fetchUserSkillInfoFromUserId as jest.Mock).mockResolvedValue(initialUserCardInfo1);

    // 実行
    render(<UserCard />);

    // 検証
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });

  test("[異常系]ユーザー情報が表示されないこと", async () => {
    // モック化
    (DB.fetchUserSkillInfoFromUserId as jest.Mock).mockRejectedValue({});

    // 実行
    await act(async () => {
      render(<UserCard />);
    });

    // 検証
    const errorMessage = screen.getByText("条件に一致するユーザーが見つかりません。");
    expect(errorMessage).toBeInTheDocument();
  });
});

describe("TOPに戻るリンク押下テスト", () => {
  test("[正常系]TOPに戻るボタン押下で正常に画面遷移すること", async () => {
    // モック化
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    // 実行
    await act(async () => {
      render(<UserCard />);
    });
    const linkToRegist = screen.getByText("TOPに戻る");
    fireEvent.click(linkToRegist);

    // 検証
    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});
