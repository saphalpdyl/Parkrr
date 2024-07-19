import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ParkingSpaceEditorPage from "./routes/editor/ParkingSpaceEditorPage";
import ParkingSpaceRendererPage from "./routes/renderer/ParkingSpaceRendererPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./routes/login/LoginPage";
import AuthorizationRoute from "./routes/AuthorizationRoute";
import SignupPage from "./routes/signup/SignupPage";
import AppLayout from "./AppLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
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
      ]
    }
  ]);

  return <>
    <RouterProvider router={router} />
    
  </>;
};
export default App;
