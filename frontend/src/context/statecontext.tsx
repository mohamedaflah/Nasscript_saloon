import { IUser } from "@/types/user.types";
import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { ConfirmationResult } from "firebase/auth";
interface FullContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  verificationCheck: ConfirmationResult | null;
  setVerificationCheck: React.Dispatch<
    React.SetStateAction<ConfirmationResult | null>
  >;
}
const FullContext = createContext<FullContextType | undefined>(undefined);
const FullContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [verificationCheck, setVerificationCheck] =
    useState<ConfirmationResult | null>(null);
  return (
    <FullContext.Provider
      value={{
        user,
        setUser,
        verificationCheck,
        setVerificationCheck,
      }}
    >
      {children}
    </FullContext.Provider>
  );
};
const useFullContext = () => {
  const context = useContext(FullContext);
  if (context === undefined) {
    throw new Error("useFullContext must be used within a FullContextProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { FullContextProvider, useFullContext };
