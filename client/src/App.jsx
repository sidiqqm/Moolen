import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TrackingMoodPage from "./pages/TrackingMoodPage";
import MoodPhotoPage from "./pages/MoodPhotoPage";
import MoodPhotoResultPage from "./pages/MoodPhotoResultPage";
import DailyJournalPage from "./pages/DailyJournalPage";
import ArticlePage from "./pages/ArticlePage";
import DeveloperPage from "./pages/developersPage";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/track-mood",
          element: <TrackingMoodPage/>,
        },
        {
          path: "/track-mood/mood-photo",
          element: <MoodPhotoPage/>,
        },
        {
          path: "/track-mood/mood-photo/result",
          element: <MoodPhotoResultPage/>,
        },
        {
          path: "/journal",
          element: <DailyJournalPage/>,
        },
        {
          path: "/article",
          element: <ArticlePage/>,
        },
        {
          path: "/developer",
          element: <DeveloperPage/>,
        },
      ],
    },
  ]);

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
