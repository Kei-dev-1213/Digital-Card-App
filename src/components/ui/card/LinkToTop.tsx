import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Link: FC<{ linkText: string; to: string }> = memo(({ linkText, to }) => {
  const navigate = useNavigate();

  return (
    <UI.Link data-testid="link" onClick={() => navigate(to)} my={4}>
      {linkText}
    </UI.Link>
  );
});
