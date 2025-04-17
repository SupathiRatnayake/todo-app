import { Outlet } from "react-router-dom";

const ProfilePage = () => {
	return (
		<>
			<h1>Profile Page</h1>
			<Outlet />
		</>
	);	
}
export default ProfilePage;