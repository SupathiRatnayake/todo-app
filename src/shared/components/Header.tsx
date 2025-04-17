import LoginButton from "../../features/auth/components/LoginButton";
import LogoutButton from "../../features/auth/components/LogoutButton";

const Header = () => {
  return (
    <header className="w-full bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-amber-500">
        <h1 className="text-2xl font-bold text-yellow-800 text-center sm:text-center ">
          Todo App
        </h1>
        <LoginButton />
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
