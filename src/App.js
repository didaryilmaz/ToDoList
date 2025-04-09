import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage.js";
import RegisterPage from "./RegisterPage.js";
import TodoPage from "./ToDoList.js";
import PrivateRoute from "./PrivateRoute.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Anasayfaya gelen her isteği register sayfasına yönlendir */}
          <Route path="/" element={<Navigate to="/register" />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            }
          />
          {/* Diğer hatalı route'lar için login sayfasına yönlendir */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
