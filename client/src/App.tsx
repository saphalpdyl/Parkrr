import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ParkingSpaceEditorPage from "./routes/editor/ParkingSpaceEditorPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Renderer</div>,
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
