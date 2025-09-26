import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./contexts/useAuth";
import { AppDataProvider } from "./contexts/AppDataContext";
import { NotificationProvider } from "./contexts/NotificationContext"; // ✅ import notif
import React from "react";

const App = () => {
  const element = useRoutes(routes);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <NotificationProvider> {/* ✅ bungkus di sini */}
      <AppDataProvider>
        <div className="flex">
          {user && <Sidebar />}
          <div className="flex-1 p-6">{element}</div>
        </div>
      </AppDataProvider>
    </NotificationProvider>
  );
};

export default App;
