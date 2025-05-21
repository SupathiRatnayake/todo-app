import { createContext } from "react";
import { UserContextType } from "./userContextTypes";

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    isLoading: true,
})