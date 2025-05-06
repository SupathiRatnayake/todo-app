import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/auth/context/UserContext";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

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
        navigate("/todos");
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
        <Typography variant="body1" mt={2}>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        paddingY="10vw"
      >
        <Typography variant="h3" gutterBottom>
          Welcome! Let's get productive!
        </Typography>
        <Typography variant="h6" gutterBottom color="text.secondry">
          Stay organized, focused, and get things done with ease.
        </Typography>
        {!isAuthenticated && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => loginWithRedirect()}
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
