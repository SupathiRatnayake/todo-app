import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';


const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      startIcon={<LogoutIcon />}
      fullWidth
      variant="text"
      sx={{
        justifyContent: "flex-start",
        color: "black",
        px: 2,
        py: 2,
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
