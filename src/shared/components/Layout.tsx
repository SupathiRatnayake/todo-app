// Using layout routes, gives layout for all pages. 
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />
            <main  className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-center">
                    <div className="w-full max-w-6xl">
                        <Outlet />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;