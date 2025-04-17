import LoginButton from "../features/auth/components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/auth/context/UserContext";

function HomePage() {
	const { isAuthenticated, isLoading: authLoading } = useAuth0();
	const { user, isLoading: userLoading } = useUser();
	const navigate = useNavigate();
	
	// console.log(`HomePage before useEffect(). User : ${user?.email}. AuthLoading : ${authLoading}. UserLoading ${userLoading}`);

	
	useEffect(() => {
		
		// console.log(`HomePage useEffect(). User : ${user?.email}. AuthLoading : ${authLoading}. UserLoading ${userLoading}`);

		if (authLoading || userLoading) return;	// do nothing if authLoading or userLoading

		if (isAuthenticated) {	// If authenticated redirect conditianally
			// console.log(`User ${user?.email} arrived redeirect point.`);
			
			if (user) {
				navigate('/profile');
			} else {	// First time login
				navigate('profile/create');
			}
		}
	}, [authLoading, userLoading, isAuthenticated, user, navigate]);
    
	return(
        <>
		<h1>Home Page</h1>
        <LoginButton />
        </>
	);
}

export default HomePage;