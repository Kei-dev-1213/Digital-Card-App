import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Register } from "./Register";
import { act } from "react";
import { DB } from "../../supabase";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";

const initialSkills = [
  {
    id: 1,
    name: "React",
  },
  {
    id: 2,
    name: "TypeScript",
  },
  {
    id: 3,
    name: "Github",
  },
];

// モック化
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../supabase", () => ({
  DB: {
    fetchAllSkills: jest.fn(),
    registUserCardInfo: jest.fn(),
  },
}));
jest.mock("canvas-confetti");

afterEach(() => {
  jest.clearAllMocks();
});

describe("初期表示テスト", () => {
  test("[正常系]タイトルが表示されていること", async () => {
    // モック化
    (DB.fetchAllSkills as jest.Mock).mockResolvedValue(initialSkills);

    // 実行
    await act(async () => {
      render(<Register />);
    });
    const pageTitle = screen.getByText("新規名刺登録");

    // 検証
    expect(pageTitle).toBeInTheDocument();
  });

  test("[正常系]ローディングスピナーが表示されること", async () => {
    // モック化
    (DB.fetchAllSkills as jest.Mock).mockResolvedValue(initialSkills);

    // 実行
    render(<Register />);

    // 検証
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });
});

describe("登録テスト", () => {
  test("[正常系]正常登録確認（全項目入力）", async () => {
    // モック化
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (DB.fetchAllSkills as jest.Mock).mockResolvedValue(initialSkills);

    // 実行
    await act(async () => {
      render(<Register />);
    });
    const inputUserId = screen.getByTestId("input-user-id");
    const inputName = screen.getByTestId("input-name");
    const inputDescription = screen.getByTestId("input-description");
    const inputSkillId = screen.getByTestId("input-skill-id");
    const inputGithubId = screen.getByTestId("input-github-id");
    const inputQiitaId = screen.getByTestId("input-qiita-id");
    const inputXId = screen.getByTestId("input-x-id");
    const registButton = screen.getByText("登録");

    await userEvent.type(inputUserId, "userIdText01");
    await userEvent.type(inputName, "ユーザー名テキスト01");
    await userEvent.type(inputDescription, "自己紹介テキスト01");
    await userEvent.selectOptions(inputSkillId, "1");
    await userEvent.type(inputGithubId, "githubText01");
    await userEvent.type(inputQiitaId, "qiitaText01");
    await userEvent.type(inputXId, "xText01");
    fireEvent.click(registButton);

    // 検証
    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledWith("/");
      expect(DB.registUserCardInfo).toHaveBeenCalledTimes(1);
      expect(DB.registUserCardInfo).toHaveBeenCalledWith({
        description: "自己紹介テキスト01",
        github_id: "githubText01",
        name: "ユーザー名テキスト01",
        qiita_id: "qiitaText01",
        skill_id: "1",
        user_id: "userIdText01",
        x_id: "xText01",
      });
    });
  });

  test("[正常系]正常登録確認（任意項目未入力）", async () => {
    // モック化
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (DB.fetchAllSkills as jest.Mock).mockResolvedValue(initialSkills);

    // 実行
    await act(async () => {
      render(<Register />);
    });
    const inputUserId = screen.getByTestId("input-user-id");
    const inputName = screen.getByTestId("input-name");
    const inputDescription = screen.getByTestId("input-description");
    const inputSkillId = screen.getByTestId("input-skill-id");
    const registButton = screen.getByText("登録");

    await userEvent.type(inputUserId, "userIdText01");
    await userEvent.type(inputName, "ユーザー名テキスト01");
    await userEvent.type(inputDescription, "自己紹介テキスト01");
    await userEvent.selectOptions(inputSkillId, "1");
    fireEvent.click(registButton);

    // 検証
    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledWith("/");
      expect(DB.registUserCardInfo).toHaveBeenCalledTimes(1);
      expect(DB.registUserCardInfo).toHaveBeenCalledWith({
        user_id: "userIdText01",
        name: "ユーザー名テキスト01",
        description: "自己紹介テキスト01",
        skill_id: "1",
        github_id: "",
        qiita_id: "",
        x_id: "",
      });
    });
  });

  test("[異常系]異常登録確認（全項目未入力）", async () => {
    // モック化
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (DB.fetchAllSkills as jest.Mock).mockResolvedValue(initialSkills);

    // 実行
    await act(async () => {
      render(<Register />);
    });
    const registButton = screen.getByText("登録");
    fireEvent.click(registButton);

    // 検証
    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledTimes(0);
      expect(DB.registUserCardInfo).toHaveBeenCalledTimes(0);
      expect(screen.getByText("好きな英単語は必須項目です。")).toBeInTheDocument();
      expect(screen.getByText("お名前は必須項目です。")).toBeInTheDocument();
      expect(screen.getByText("自己紹介は必須項目です。")).toBeInTheDocument();
      expect(screen.getByText("好きな技術は必須項目です。")).toBeInTheDocument();
    });
  });

  test("[異常系]異常登録確認（半角文字入力項目に全角文字を入力）", async () => {
    // モック化
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (DB.fetchAllSkills as jest.Mock).mockResolvedValue(initialSkills);

    // 実行
    await act(async () => {
      render(<Register />);
    });
    const inputUserId = screen.getByTestId("input-user-id");
    const inputGithubId = screen.getByTestId("input-github-id");
    const inputQiitaId = screen.getByTestId("input-qiita-id");
    const inputXId = screen.getByTestId("input-x-id");
    const registButton = screen.getByText("登録");

    await userEvent.type(inputUserId, "全角文字列");
    await userEvent.type(inputGithubId, "全角文字列");
    await userEvent.type(inputQiitaId, "全角文字列");
    await userEvent.type(inputXId, "全角文字列");
    fireEvent.click(registButton);

    // 検証
    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledTimes(0);
      expect(DB.registUserCardInfo).toHaveBeenCalledTimes(0);
      expect(screen.getByText("好きな英単語は半角英数字で入力してください。")).toBeInTheDocument();
      expect(screen.getByText("Github IDは半角英数字で入力してください。")).toBeInTheDocument();
      expect(screen.getByText("Qiita IDは半角英数字で入力してください。")).toBeInTheDocument();
      expect(screen.getByText("X IDは半角英数字で入力してください。")).toBeInTheDocument();
    });
  });
});

describe("TOPに戻るリンク押下テスト", () => {
  test("[正常系]TOPに戻るボタン押下で正常に画面遷移すること", async () => {
    // モック化
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    // 実行
    await act(async () => {
      render(<Register />);
    });
    const linkToRegist = screen.getByText("TOPに戻る");
    fireEvent.click(linkToRegist);

    // 検証
    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});
