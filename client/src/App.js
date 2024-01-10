import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Activation from "./pages/Activation";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import CategoryEdit from "./pages/CategoryEdit";
import CategoryCreate from "./pages/CategoryCreate";
import PostDetail from "./pages/Posts/PostDetail";
import PostEdit from "./pages/Posts/PostEdit";
import CreatePost from './pages/Posts/CreatePost';
import CreateComment from './pages/Messages/CreateComment';
import MyPosts from './pages/Posts/MyPosts';
import CategoryPosts from "./pages/CategoryPosts";
import Posts from "./pages/AllPost";
import Single from './pages/SinglePost';
import CommentsByPost from './pages/CommentsByPost';
import PostCategories from './pages/PostCategories';
import PostLikes from './pages/PostLikes';
import CreateLike from './pages/CreateLike';
import UpdatePost from './pages/UpdatePost';
import "./style.scss";
import AcountManegment from "./pages/AcountManegment";
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';
import CreateUser from './pages/CreateUser';
import ChangeAvatar from './pages/ChangeAvatar';
import UpdateUser from './pages/UpdateUser';
import DeleteUser from './pages/DeleteUser';
import UserManager from './pages/UserManager';
import ChangePassword from "./pages/ChangePassword";
import MyAccount from "./pages/MyAccounts";
import AllUsers from "./pages/AllUsers";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/acountManegment", element: <AcountManegment /> },
            { path: "/write", element: <Write /> },
            { path: "/categories", element: <Categories /> },
            { path: "/categories/:categoryId", element: <CategoryDetail /> },
            { path: "/categories/:categoryId/posts", element: <CategoryPosts /> },
            { path:"/users", element:<UserList />},
            { path:"/users/:userId", element:<UserDetails />},
            { path:"/manager", element:<UserManager />},
            { path: "/posts/my", element: <MyPosts /> },
        ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/activation/:activation_token", element: <Activation /> },
    { path: "/resetPassword/:confirmToken", element: <ChangePassword /> },
    { path:"/myAccount", element:<MyAccount />},
    { path:"/users", element:<AllUsers />},
    { path:"/users/:userId", element:<UserDetails/>},
    { path:"/updateUser/:userId", element:<UpdateUser />}
]);

function App() {
    return (
        <div className="app">
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
