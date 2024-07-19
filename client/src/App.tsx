import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ParkingSpaceEditorPage from "./routes/editor/ParkingSpaceEditorPage";
import ParkingSpaceRendererPage from "./routes/renderer/ParkingSpaceRendererPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./routes/login/LoginPage";
import AuthorizationRoute from "./routes/AuthorizationRoute";
import SignupPage from "./routes/signup/SignupPage";
import applicationLogo from "/logo_main_t.png";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { loading: authLoading } = useAuth();
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <ParkingSpaceRendererPage />,
        },
        {
          path: "editor/",
          element: (
              <ParkingSpaceEditorPage />
          ),
        },
      ],
    },
    {
      path: "/auth/",
      element: <AuthorizationRoute />,
      children: [
        {
          path: "login/",
          element: <LoginPage />
        },
        {
          path: "signup/",
          element: <SignupPage />
        },
      ]
    },
  ]);

  return <>
    <RouterProvider router={router} />
    <div className={`
      h-screen w-screen z-40 absolute left-0 top-0 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none transition-all
        ${authLoading ? "opacity-100" : "opacity-0"}
      `}>
      <img src={applicationLogo} alt="Loading Application Logo" className="opacity-75 h-40 mb-16"/>
      <span className="font-poppins text-2xl animate-pulse">Loading your instance</span>
      <span className="text-xs text-neutral-600">The authentication process is going on.</span>
    </div>
  </>;
};
export default App;
