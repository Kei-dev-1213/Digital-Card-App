import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";
import { UserCardInfo } from "../../../type/UserCardInfo";
import { CardIcons } from "./CardIcons";

export const Card: FC<{ userData: UserCardInfo; w: string }> = memo(({ userData, w }) => {
  return (
    <UI.Card w={w} mx="auto" p={4}>
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
      <CardIcons userData={userData} />
    </UI.Card>
  );
});
