import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
	<Button
		variant="outlined"
		color="inherit"
		size="small"
		onClick={() => loginWithRedirect()}
		sx={{
			px: 3,
			py: 1,
			borderRadius: '2vw',
			backgroundColor: 'rgba(0, 0, 0, 1)',
			borderColor: 'white',
			'&:hover': {
				backgroundColor: 'rgba(90, 90, 90, 1)'
			}
		}}
	>
		Log in
	</Button>)
  );
};

export default LoginButton;
