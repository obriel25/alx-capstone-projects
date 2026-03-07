import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("quizUser");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("quizUser");
      }
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("quizUsers") || "[]");

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...safeUser } = foundUser;
      localStorage.setItem("quizUser", JSON.stringify(safeUser));
      setUser(safeUser);

      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("quizUsers") || "[]");

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("quizUsers", JSON.stringify(users));

    const { password: _, ...safeUser } = newUser;
    localStorage.setItem("quizUser", JSON.stringify(safeUser));
    setUser(safeUser);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("quizUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}