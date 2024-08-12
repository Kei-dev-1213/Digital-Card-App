import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";

export const PageWrapper: FC<{ children: ReactNode; h?: string }> = memo(({ children, h }) => {
  return (
    <UI.Flex h={h ? h : "auto"} w="100%" my={10} flexDirection="column" alignItems="center" justifyContent="center">
      {children}
    </UI.Flex>
  );
});
