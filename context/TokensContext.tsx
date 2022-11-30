import React, { ReactChild, createContext, useContext } from "react";
// import { useTokensData } from "../hooks/useTokensData";

const TokensContext = createContext([]);

interface Props {
  children: ReactChild;
}

export const TokensContextProvider = ({ children }: Props) => {
  // const { tokens } = useTokensData();

  return <TokensContext.Provider value={[]}>{children}</TokensContext.Provider>;
};

export function useTokensContext() {
  return useContext(TokensContext);
}
