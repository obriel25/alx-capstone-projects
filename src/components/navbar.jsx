import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export  default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/quiz", label: "Play Quiz" },
    { path: "/history", label: "History" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-indigo-600">
            🧠 QuizMaster
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path !== "/" &&
                  location.pathname.startsWith(link.path));

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}