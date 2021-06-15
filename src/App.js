import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./apis/auth.js";
import { LoadingOutlined } from "@ant-design/icons";

// import Header from "./components/nav/Header.js";
// import Login from "./pages/auth/Login.js";
// import Register from "./pages/auth/Register.js";
// import Home from "./pages/Home.js";
// import RegisterComplete from "./pages/auth/RegisterComplete.js";
// import ForgotPassword from "./pages/auth/ForgotPassword.js";
// import History from "./pages/user/History.js";
// import UserRoute from "./components/routes/UserRoutes.js";
// import Password from "./pages/user/Password.js";
// import Wishlist from "./pages/user/Wishlist.js";
// import AdminRoute from "./components/routes/AdminRoutes.js";
// import AdminDashboard from "./pages/admin/AdminDashboard.js";
// import CategoryCreate from "./pages/admin/category/CategoryCreate.js";
// import CategoryUpdate from "./pages/admin/category/CategoryUpdate.js";
// import SubCategoryCreate from "./pages/admin/subCategory/SubCategoryCreate.js";
// import SubCategoryUpdate from "./pages/admin/subCategory/SubCategoryUpdate.js";
// import ProductCreate from "./pages/admin/product/ProductCreate.js";
// import AllProducts from "./pages/admin/product/AllProducts.js";
// import ProductUpdate from "./pages/admin/product/ProductUpdate.js";
// import Product from "./pages/Product.js";
// import CategoryHome from "./pages/category/CategoryHome.js";
// import SubCategoryHome from "./pages/subCategory/SubCategoryHome.js";
// import Shop from "./pages/Shop.js";
// import Cart from "./pages/Cart.js";
// import SideDrawer from "./components/drawer/SideDrawer.js";
// import Checkout from "./pages/Checkout.js";
// import Coupon from "./pages/admin/coupon/Coupon.js";
// import Payment from "./pages/Payment.js";
// import { getCurrentUser } from "./apis/auth.js";

const Header = lazy(() => import("./components/nav/Header.js"));
const Login = lazy(() => import("./pages/auth/Login.js"));
const Register = lazy(() => import("./pages/auth/Register.js"));
const Home = lazy(() => import("./pages/Home.js"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete.js"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword.js"));
const History = lazy(() => import("./pages/user/History.js"));
const UserRoute = lazy(() => import("./components/routes/UserRoutes.js"));
const Password = lazy(() => import("./pages/user/Password.js"));
const Wishlist = lazy(() => import("./pages/user/Wishlist.js"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoutes.js"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.js"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate.js")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate.js")
);
const SubCategoryCreate = lazy(() =>
  import("./pages/admin/subCategory/SubCategoryCreate.js")
);
const SubCategoryUpdate = lazy(() =>
  import("./pages/admin/subCategory/SubCategoryUpdate.js")
);
const ProductCreate = lazy(() =>
  import("./pages/admin/product/ProductCreate.js")
);
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts.js"));
const ProductUpdate = lazy(() =>
  import("./pages/admin/product/ProductUpdate.js")
);
const Product = lazy(() => import("./pages/Product.js"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome.js"));
const SubCategoryHome = lazy(() =>
  import("./pages/subCategory/SubCategoryHome.js")
);
const Shop = lazy(() => import("./pages/Shop.js"));
const Cart = lazy(() => import("./pages/Cart.js"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer.js"));
const Checkout = lazy(() => import("./pages/Checkout.js"));
const Coupon = lazy(() => import("./pages/admin/coupon/Coupon.js"));
const Payment = lazy(() => import("./pages/Payment.js"));
const GauaravForm = lazy(() => import("./pages/gaurav/Form.js"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        getCurrentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => {
            console.log("error while saving user ", err);
          });
      }
    });
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="text-center p-5 col">
          EC
          <LoadingOutlined />
          MMERCE
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/shop" component={Shop}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/checkout" component={Checkout}></Route>
        <Route
          exact
          path="/register/complete"
          component={RegisterComplete}
        ></Route>
        <Route exact path="/forgot/password" component={ForgotPassword}></Route>
        <Route exact path="/product/:slug" component={Product}></Route>
        <Route exact path="/category/:slug" component={CategoryHome}></Route>
        <Route
          exact
          path="/subcategory/:slug"
          component={SubCategoryHome}
        ></Route>
        <Route exact path="/payment" component={Payment}></Route>
        <Route exact path="/gaurav" component={GauaravForm}></Route>
        <UserRoute exact path="/user/history" component={History}></UserRoute>
        <UserRoute exact path="/user/password" component={Password}></UserRoute>
        <UserRoute exact path="/user/wishlist" component={Wishlist}></UserRoute>
        <AdminRoute
          exact
          path="/admin/dashboard"
          component={AdminDashboard}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/category"
          component={CategoryCreate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/products"
          component={AllProducts}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/product"
          component={ProductCreate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/subcategory"
          component={SubCategoryCreate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/subcategory/:slug"
          component={SubCategoryUpdate}
        ></AdminRoute>
        <AdminRoute exact path="/admin/coupon" component={Coupon}></AdminRoute>
      </Switch>
    </Suspense>
  );
};

export default App;
