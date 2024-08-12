import { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DB } from "../../supabase";
import { UserCardInfo } from "../../type/UserCardInfo";
import * as UI from "@chakra-ui/react";
import { Card } from "../../components/ui/card/Card";
import { Loading } from "../../components/ui/loading/Loading";

export const Cards: FC = memo(() => {
  // hooks
  const { id } = useParams();

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
    } catch (e) {
      console.error(e);
      setError("予期せぬエラーが発生しました。");
      setLoading(false);
    }
  };

  return (
    <UI.Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
      {error ? error : loading ? <Loading /> : <Card userData={userData} w="60%" />}
    </UI.Flex>
  );
});
