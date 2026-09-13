import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/Register/Register";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Profile from "../pages/profile/Profile";
import NotFound from "../pages/notFound/NotFound";
import MainProtected from "../components/guard/mainProtcted/MainProtected";
import AuthProtected from "../components/guard/authProtected/AuthProtected";
import PostDetails from "../components/pages/postDetails/PostDetails";

export const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <AuthProtected>
        <AuthLayout />
      </AuthProtected>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "",
    element: (
      <MainProtected>
        <MainLayout />
      </MainProtected>
    ),
    children: [
      { path: "home", element: <Home /> },
      { path: "postDetails/:postId", element: <PostDetails /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
