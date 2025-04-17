import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../models/User";
import { getUserFromBackend } from "../../../api/userApi";


interface UserContextType {
    user : User | null;
    setUser: (user:User | null) => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    isLoading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user: auth0User, getAccessTokenSilently } = useAuth0();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
		// console.log(`HomePage useEffect(). User : ${user?.email}`);

        const loadUser = async() => {
            if (isAuthenticated && auth0User?.email) {
                try {
                    const token = await getAccessTokenSilently();
                    const backendUser = await getUserFromBackend(auth0User.email, token);
                    setUser(backendUser);
                    setIsLoading(false);

            		// console.log(`Backend user ${backendUser.email} is assigned to user ${user?.email}`);

                } catch (error) {
                    console.error('Failed to load user from backend.', error);
                }
            }
        };
        
        loadUser();

    }, [isAuthenticated, auth0User, getAccessTokenSilently]);

    const obj = useMemo(() => ({user, setUser, isLoading}), [isLoading, user]);

    return (
        <UserContext.Provider value={obj}>
            {children}
        </UserContext.Provider>
    );
};
export const useUserContext = () => useContext(UserContext);