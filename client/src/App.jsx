import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
