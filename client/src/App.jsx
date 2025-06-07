import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ArticlePage from "./pages/ArticlePage";
import DailyJournalPage from "./pages/DailyJournalPage";
import DeveloperPage from "./pages/developersPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import MoodPhotoPage from "./pages/MoodPhotoPage";
import MoodPhotoResultPage from "./pages/MoodPhotoResultPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import { AssessmentForm, AssessmentStart, SelfAssessment, SummaryForm } from "./pages/Self-assessmentPage";

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
          element: <MoodPhotoPage/>,
        },
        {
          path: "/track-mood/result",
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
          path: "/self-assesment",
          element: <SelfAssessment/>,
        },
        {
          path: "/self-assessment/start",
          element: <AssessmentStart />,
        },
        {
          path: "/self-assessment/form",
          element: <AssessmentForm />,
        },
        {
          path: "/self-assessment/summary",
          element: <SummaryForm />,
        },
        {
          path: "/developer",
          element: <DeveloperPage/>,
        },
        {
          path: "/profile",
          element: <ProfilePage/>,
        },
      ],
    },
  ]);

function App() {
  return (
    <GoogleOAuthProvider clientId="768186315433-6t2urqeffgbun6fe4e30unlt6b4jio7n.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
