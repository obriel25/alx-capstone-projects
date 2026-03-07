import "../app.css";
import { Outlet } from "react-router-dom";

import { QuizProvider } from "../context/QuizContext";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/navbar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <QuizProvider>

        <div className="antialiased bg-gray-50 min-h-screen">
          
          <Navbar />

          <main>
            <Outlet />
          </main>

        </div>

      </QuizProvider>
    </AuthProvider>
  );
}