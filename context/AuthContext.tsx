import React, {
  ReactChild,
  createContext,
  useContext,
  MouseEventHandler,
} from "react";
import { useAuth, JWTokens } from "../hooks/useAuth";

type AuthProviderState = {
  connect: MouseEventHandler<HTMLButtonElement> | undefined;
  qubicConnect: MouseEventHandler<HTMLButtonElement> | undefined;
  disconnect: (
    redirectURLPath?: string
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
  changeNetwork: () => void;

  removeJWTs: (() => void) | undefined;
  setJWTs: ((_jwt: JWTokens) => void) | undefined;

  account: string | null | undefined;
  chainId: number | undefined;

  address: string | null | undefined;
  isConnected: boolean | null | undefined;
  isWrongNetwork: boolean | undefined;
  isAuth: boolean | undefined;
  jwts: JWTokens | undefined;
};

const AUTH_INITIAL_STATE = {
  connect: undefined,
  qubicConnect: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect: () => () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeNetwork: () => () => {},

  removeJWTs: undefined,
  setJWTs: undefined,

  account: undefined,
  chainId: undefined,

  address: undefined,
  isAuth: undefined,
  isConnected: undefined,
  isWrongNetwork: undefined,
  jwts: undefined,
};

const AuthContext = createContext<AuthProviderState>(AUTH_INITIAL_STATE);

interface Props {
  children: ReactChild;
}

export const AuthContextProvider = ({ children }: Props) => {
  const authProviderState = useAuth();

  return (
    <AuthContext.Provider value={authProviderState}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
