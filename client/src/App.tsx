import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ParkingSpaceEditorPage from "./routes/editor/ParkingSpaceEditorPage";
import ParkingSpaceRendererPage from "./routes/renderer/ParkingSpaceRendererPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
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
          path: "/editor",
          element: (
              <ParkingSpaceEditorPage />
          ),
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};
export default App;
