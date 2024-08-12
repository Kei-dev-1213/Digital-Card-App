import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";

export const PageTitle: FC<{ children: ReactNode }> = memo(({ children }) => {
  return <UI.Heading mb={4}>{children}</UI.Heading>;
});
