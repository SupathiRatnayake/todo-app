import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../models/User";
import { getUserFromBackend } from "../../../api/userApi";


type UserContextType = {
    user : User | null;
    isLoading: boolean;
};

const userContext = createContext<UserContextType>({
    user: null,
    isLoading: true,
});

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user: auth0User, getAccessTokenSilently } = useAuth0();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async() => {
            if (isAuthenticated && auth0User?.email) {
                try {
                    const token = await getAccessTokenSilently();
                    const backendUser = await getUserFromBackend(auth0User.email, token);
                    setUser(backendUser);
                } catch (error) {
                    console.error('Failed to load user from backend.', error);
                }
            }
            setIsLoading(false);
        };
        
        loadUser();
    }, [isAuthenticated, auth0User, getAccessTokenSilently]);

    

    return (
        <userContext.Provider value={{ user, isLoading }}>
            {children}
        </userContext.Provider>
    );
};