import { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DB } from "../../supabase";
import { UserCard } from "../../type/UserCard";
import * as UI from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";

export const Card: FC = memo(() => {
  // hooks
  const { id } = useParams();

  // state
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserCard>({} as UserCard);

  // 初期処理
  useEffect(() => {
    refreshUserData();
  }, []);

  // functions
  const refreshUserData = async () => {
    const fetchedUserData = await DB.fetchUserSkillInfoFromUserId(id!);
    if (fetchedUserData) {
      setUserData(fetchedUserData);
      setLoading(false);
    }
  };

  return (
    <UI.Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <UI.Card w={"60%"} mx="auto" p={4}>
          <UI.Heading as="h2" size="md" my={3}>
            名前:{userData.name}
          </UI.Heading>
          <UI.Box my={3}>
            <UI.Heading as="h3" size="sm" fontWeight="bold">
              自己紹介
            </UI.Heading>
            <div dangerouslySetInnerHTML={{ __html: userData.description }}></div>
          </UI.Box>
          <UI.Box my={3}>
            <UI.Heading as="h3" size="sm" fontWeight="bold">
              好きな技術
            </UI.Heading>
            {userData.skill}
          </UI.Box>
          <UI.Flex justifyContent="space-between">
            <UI.Link href={userData.getGithubUrl()} target="_blank">
              <FaGithub size="30px" />
            </UI.Link>
            <UI.Link href={userData.getQiitaUrl()} target="_blank">
              <GrArticle size="30px" />
            </UI.Link>
            <UI.Link href={userData.getXUrl()} target="_blank">
              <FaXTwitter size="30px" />
            </UI.Link>
          </UI.Flex>
        </UI.Card>
      )}
    </UI.Flex>
  );
});
