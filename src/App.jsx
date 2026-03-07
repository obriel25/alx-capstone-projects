import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "../src/app/layout";
import HomePage from "../src/app/page";
import HistoryPage from "../src/app/history";
import LoginPage from "../src/app/login";
import QuizPage from "../src/app/quiz"; // make sure this file exists

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Wrapper */}
        <Route element={<RootLayout />}>

          {/* Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;