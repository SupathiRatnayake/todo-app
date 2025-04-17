const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Todo App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
