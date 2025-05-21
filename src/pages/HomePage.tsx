import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/auth/userHook";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import logo from "../../public/todo logo.png";
import LoginButton from "../features/auth/LoginButton";

const HomePage = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth0();
  const { user, isLoading: userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading || userLoading) return; // do nothing if authLoading or userLoading

    if (isAuthenticated) {
      // If authenticated redirect conditianally
      console.log(user, userLoading);

      if (user) {
        navigate("/app/todos");
      } else {
        // First time login
        navigate("/profile/create");
      }
    }
  }, [authLoading, userLoading, isAuthenticated, user, navigate]);

  if (authLoading || userLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 20, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container 
    disableGutters
    sx={{ 
      minWidth: "100%",
      minHeight: "100vh",
      backgroundImage: "url('../../public/landing_bg.jpg')", 
      }}>
      <header className="w-full bg-white text-white py-1 shadow-md">
        <div className="px-4 py-0 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Todo App" className="h-8 w-auto" />
          </div>
          {/* Login/Logout buttons */}
          <div className="flex items-center space-x-4">
            <LoginButton />
          </div>
        </div>
      </header>
      <Box
      sx={{
        marginTop: "5vw",
        paddingTop: "vw",
        alignItems: "center",
        justifyContent: "center",
        
      }}
      >
        <Box
          display="flex"
          flexDirection="column"
          paddingY="10vw"
          width="50%"
          margin="auto"
          alignContent="center"
          alignItems="center"
          bgcolor="white"
        >
          <Typography 
          fontFamily="sans-serif"
          textAlign="center" 
          variant="h2" 
          gutterBottom>
            Welcome! Let's get productive!
          </Typography>
          <Typography
            textAlign="center"
            variant="h4"
            gutterBottom
            color="text.secondry"
          >
            Stay organized, focused, and get things done with ease.
          </Typography>
          {!isAuthenticated && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => loginWithRedirect()}
              sx={{
                mt: 4,
                width: "34vw",
                fontSize: "1.7vw",
              }}
            >
              Get Started
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
