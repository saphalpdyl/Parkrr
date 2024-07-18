import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ParkingSpaceEditorPage from "./routes/editor/ParkingSpaceEditorPage";
import ParkingSpaceRendererPage from "./routes/renderer/ParkingSpaceRendererPage";
import useAuthStore from "./stores/authState";

const App = () => {
  const { token } = useAuthStore();
  console.log(token);
  
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
