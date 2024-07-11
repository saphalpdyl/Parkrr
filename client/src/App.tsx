import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";

import ParkingSpaceEditorPage from "./routes/ParkingSpaceEditorPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello World</div>,
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
