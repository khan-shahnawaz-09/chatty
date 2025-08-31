import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore";
import useThemeStore from "./store/ThemeStore";
import { Loader } from "lucide-react";
const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  //this function checking for the user that authorized or not even if after referecing the page
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Navbar />
      <Toaster />
      <Outlet />
    </div>
  );
};

export default App;
