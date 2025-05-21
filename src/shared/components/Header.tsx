import LoginButton from "../../features/auth/LoginButton";
import LogoutButton from "../../features/auth/LogoutButton";
import logo from '../../../public/todo logo.png';

const Header = () => {
  return (
    <header className="w-full bg-white text-white py-1 shadow-md">
      <div className="px-4 py-0 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Todo App" className="h-8 w-auto" />
        </div>
        {/* Login/Logout buttons */}
        <div className="flex items-center space-x-4">
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
