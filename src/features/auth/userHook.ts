import { useContext } from "react";
import { UserContext } from "./userContext";

export const useUser = () => useContext(UserContext);
export const useUserContext = () => useContext(UserContext);