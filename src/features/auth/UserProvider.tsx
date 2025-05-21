import { useState, useEffect, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "./User";
import { getUserFromBackend } from "../../api/userApi";
import { UserContext } from "./userContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user: auth0User, getAccessTokenSilently, isLoading : auth0Loading } = useAuth0();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {		
        const loadUser = async() => {
            if (isAuthenticated && auth0User?.email) {
                try {
                    const token = await getAccessTokenSilently();
                    const backendUser = await getUserFromBackend(auth0User.email, token);
                    setUser(backendUser);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Failed to load user from backend.', error);
                    setIsLoading(false);
                }
            } 
        };
        if ( !auth0Loading && isAuthenticated && auth0User) {
            loadUser();
        } else if (!auth0Loading) {
            setIsLoading(false);
        }

    }, [isAuthenticated, auth0User, getAccessTokenSilently, auth0Loading]);

    const contextValue = useMemo(() => ({user, setUser, isLoading}), [user, setUser, isLoading]);

    return (
        <UserContext.Provider value={contextValue}>
            {isLoading ? <p>Loading...</p> : children}
        </UserContext.Provider>
    );
};
