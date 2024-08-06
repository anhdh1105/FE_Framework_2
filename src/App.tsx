import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCategory from "./components/Category/AddCategory";
import AllCategory from "./components/Category/AllCategory";
import EditCategory from "./components/Category/EditCategory";
import AddProduct from "./components/Product/AddProduct";
import AllProducts from "./components/Product/AllProducts";
import EditProduct from "./components/Product/EditProduct";
import CategoryContext from "./context/categoryContext";
import ProductContext from "./context/productContext";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Cart/Checkout";
import HomePage from "./pages/HomePage";
import ListProductPage from "./pages/ListProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchProductsPage from "./pages/SearchProducts/SearchProducts";
import DefaultAdmin from "./layouts/AdminLayout/defaultAdmin";
// import Search from "./pages/SearchProducts/Search";

const App = () => {
  const router = createBrowserRouter([

    {
      path: 'admin', element: <ProductContext> <CategoryContext><AdminLayout /></CategoryContext></ProductContext>,
      children: [
        {
          path: '', element: <DefaultAdmin />,
        },
        {
          path: 'category', element: <AllCategory />,
        },
        { path: 'category/add', element: <AddCategory /> },
        { path: 'category/edit/:id', element: <EditCategory /> },
        { path: 'products/add', element: <AddProduct /> },
        { path: 'products', element: <AllProducts /> },
        { path: 'products/edit/:id', element: <EditProduct /> },
      ]
    },
    {
      path: "",
      element: <ProductContext> <MainLayout /></ProductContext>,
      children: [
        {
          path: '/signin', element: <Signin />
        },
        {
          path: '/signup', element: <Signup />
        },
        {
          path: '/cart', element: <Cart />
        }, {
          path: '/checkout', element: <Checkout />
        },
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/category/:id",
          element: <ListProductPage />,
        },
        {
          path: `/products/:id`,
          element: <ProductDetailPage />,
        },
        {
          path: "/search",
          element: <SearchProductsPage />,
        },
        // {
        //   path: "/search",
        //   element: <Search />,
        // },
        {
          path: 'products',
          element: <ListProductPage />,
        },
        {
          path: 'products/detail',
          element: <ProductDetailPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
