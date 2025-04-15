import LoginButton from "../../features/auth/components/LoginButton";
import LogoutButton from "../../features/auth/components/LogoutButton";

const Header = () => {
    return (
        <div>
            This is header.
            <LoginButton />
            <LogoutButton />
        </div>
    );
};

export default Header;