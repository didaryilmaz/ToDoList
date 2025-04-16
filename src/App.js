import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage.js";
import RegisterPage from "./RegisterPage.js";
import TodoPage from "./ToDoList.js";
import MainPage from "./MainPage.js";
import PrivateRoute from "./PrivateRoute.js";
import AdminPage from "./AdminPage.js"; // ← yeni eklenen satır

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
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
          <Route path="/admin" element={<AdminPage />} /> {/* ← yeni eklenen route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
