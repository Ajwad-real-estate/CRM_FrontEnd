import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import App from "./App";
import SignIn from "./pages/sign/SignIn";
import Cookies from "js-cookie";
import "./index.css";
import "./components/topBar/Topbar.css";

const AuthWrapper = ({ children }) => {
  const isAuthenticated = !!Cookies.get("accessToken");

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

const Main = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<SignIn />} />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <AuthWrapper>
            <App />
          </AuthWrapper>
        }
      />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
