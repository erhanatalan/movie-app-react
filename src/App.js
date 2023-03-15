import React from "react";
import Navbar from "./components/Navbar";
import AuthContextProvider from "./context/AuthContext";
import Register from "./pages/Register";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <AppRouter/>
      </AuthContextProvider>
    </div>
  );
};

export default App;
