import { FC, memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DB } from "../../supabase";
import { UserCardInfo } from "../../type/UserCardInfo";
import * as UI from "@chakra-ui/react";
import { Card } from "../../components/ui/card/Card";
import { Loading } from "../../components/ui/loading/Loading";
import { useMessage } from "../../hooks/useMessage";
import { PageWrapper } from "../../components/ui/layout/PageWrapper";

export const UserCard: FC = memo(() => {
  // hooks
  const { id } = useParams();
  const { displayMessage } = useMessage();
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserCardInfo>({} as UserCardInfo);
  const [error, setError] = useState("");

  // 初期処理
  useEffect(() => {
    refreshUserData();
  }, []);

  // functions
  const refreshUserData = async () => {
    try {
      const fetchedUserData = await DB.fetchUserSkillInfoFromUserId(id!);
      setUserData(fetchedUserData);
      setError("");
      setLoading(false);
      displayMessage({ title: "検索が完了しました。", status: "success" });
    } catch (e) {
      console.error(e);
      setError("条件に一致するユーザーが見つかりません。");
      setLoading(false);
      displayMessage({ title: "ユーザーが見つかりません。", status: "error" });
    }
  };

  return (
    <PageWrapper h="100vh">
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? error : <Card userData={userData} w="70%" />}
          <UI.Link onClick={() => navigate("/")} my={4}>
            TOPに戻る
          </UI.Link>
        </>
      )}
    </PageWrapper>
  );
});
