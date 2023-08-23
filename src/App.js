import "react-toastify/dist/ReactToastify.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/login";
import MovieList from "./components/movieList";
import Register from "./components/register";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { Constant } from "./consts/constant";

const router = createBrowserRouter([
  { path: "/", element: <MovieList /> },
  { path: Constant.page.login, element: <Login /> },
  { path: Constant.page.register, element: <Register /> }
]);

function App() {
  useEffect(() => {
    // Redirect to login if page is not login or register.
    const pathname = window.location.pathname;
    if (
      !pathname.includes(Constant.page.login) &&
      !pathname.includes(Constant.page.register)
    ) {
      const user = JSON.parse(localStorage.getItem(Constant.storageKey.user));
      if (!user) {
        window.location.replace("/login");
      }
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
