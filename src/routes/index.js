import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <Forgotpassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct/>
      },
      {
        path: "product/:id",
        element: <ProductDetail/>
      },
      {
        path : "cart",
        element : <Cart/>

      },
      {
        path : "search",
        element : <SearchProduct/>

      },
      {
        path: "Admin-panel",
        element: <AdminPanel/>,
        children: [
          {
            path: "all-users",
            element: <AllUser/>
          },
          {
            path: "all-products",
            element: <AllProducts/>
          }
        ]
      },
    ]
  },
]);
export default router;
