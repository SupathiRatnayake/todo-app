import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
	return (
		<Container maxWidth="md">
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignContent="center"
		>
			<Typography 
			variant="h3" 
			align="center"
			gutterBottom>
				Your Profile
			</Typography>
			<Outlet />
		</Box>
	</Container>
	);	
}
export default ProfilePage;