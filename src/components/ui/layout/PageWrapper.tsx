import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";

export const PageWrapper: FC<{ children: ReactNode; h?: string; my?: string }> = memo(({ children, h, my }) => {
  return (
    <UI.Flex
      my={my ? my : 0}
      h={h ? h : "auto"}
      w="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </UI.Flex>
  );
});
