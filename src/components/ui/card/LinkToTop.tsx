import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const LinkToTop: FC = memo(() => {
  const navigate = useNavigate();

  return (
    <UI.Link onClick={() => navigate("/")} my={4}>
      TOPに戻る
    </UI.Link>
  );
});
