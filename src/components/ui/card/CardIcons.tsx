import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { UserCardInfo } from "../../../type/UserCardInfo";

export const CardIcons: FC<{ userData: UserCardInfo }> = memo(({ userData }) => {
  return (
    <UI.Flex justifyContent="space-between" mx={6}>
      {userData.github_id && (
        <UI.Link href={userData.getGithubUrl()} target="_blank" data-testid="github-link">
          <FaGithub size="30px" />
        </UI.Link>
      )}
      {userData.qiita_id && (
        <UI.Link href={userData.getQiitaUrl()} target="_blank" data-testid="qiita-link">
          <GrArticle size="30px" />
        </UI.Link>
      )}
      {userData.x_id && (
        <UI.Link href={userData.getXUrl()} target="_blank" data-testid="x-link">
          <FaXTwitter size="30px" />
        </UI.Link>
      )}
    </UI.Flex>
  );
});
