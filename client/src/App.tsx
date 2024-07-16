import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ParkingSpaceEditorPage from "./routes/editor/ParkingSpaceEditorPage";
import ParkingSpaceRendererPage from "./routes/renderer/ParkingSpaceRendererPage";

const App = () => {
  const router = createBrowserRouter([
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
  ]);

  return <RouterProvider router={router} />;
};
export default App;
