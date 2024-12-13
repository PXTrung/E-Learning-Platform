import { Navigate, useRoutes } from "react-router-dom";
import { PARAMETER, PATHS } from "../constants/path";
import Admin_Layout from "../layouts/Admin_Layout";

// Admin Page
import Auth_Layout from "../layouts/Auth_Layout";
import Home_Layout from "../layouts/Home_Layout";
import NotFound from "../layouts/NotFound";
import CategoryManagement from "../pages/admin/CategoryManagement";
import UserManagement from "../pages/admin/UserManagement";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Cart from "../pages/home/Cart";
import CourseDetail from "../pages/home/CourseDetail";
import CourseViewer from "../pages/home/CourseViewer";
import HomePage from "../pages/home/HomePage";
import CourseManagement from "../pages/lecturer/CourseManagement";
import SessionLecture from "../pages/lecturer/SessionLecture";
import CheckoutPage from "../pages/home/CheckoutPage";
import CompletePurchasePage from "../pages/home/CompletePurchasePage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import api from "../services/api";
import NotFoundPage from "../pages/shared/NotFoundPage";
import Profile_Layout from "../layouts/Profile_Layout";
import PaidCourseDetail from "../pages/Profile/PaidCourseDetail";

const publishableKey =
  "pk_test_51Q0z3bBaTHc1s49ot8YH821Hw49xyphqc2xBVR9k4Sylvic0rAH5OAf5KY7vVA63S6wqLCCqMS9usnm61hKjn2FF00Ubufxmfy";

//const stripePromise = await loadStripe(publishableKey);

const adminRoute = {
  path: PATHS.ADMIN.IDENTITY,
  element: <Admin_Layout />,
  children: [
    {
      path: `/${PATHS.ADMIN.IDENTITY}`,
      element: <Navigate to={`${PATHS.ADMIN.CATEGORY}`} replace />,
    },
    {
      path: PATHS.ADMIN.CATEGORY,
      element: <CategoryManagement />,
    },
    {
      path: PATHS.ADMIN.COURSE,
      element: <CourseManagement />,
    },
    {
      path: PATHS.ADMIN.USER,
      element: <UserManagement />,
    },
    {
      path: `${PATHS.ADMIN.COURSE}/${PATHS.ADMIN.DETAILS}`,
      element: <SessionLecture />,
    },
  ],
};

const homeRoute = (
  createOrder: () => void,
  clientSecret: string,
  options: StripeElementsOptions
) => ({
  path: "/",
  element: <Home_Layout />,
  children: [
    {
      path: "/",
      element: <Navigate to={`${PATHS.HOME.IDENTITY}`} replace />,
    },
    {
      path: PATHS.HOME.IDENTITY,
      element: <HomePage />,
    },
    {
      path: `${PATHS.HOME.IDENTITY}/${PATHS.HOME.COURSE}`,
      element: <CourseDetail />,
    },
    {
      path: `${PATHS.HOME.IDENTITY}/${PATHS.HOME.CART}`,
      element: <Cart onCreateOrder={createOrder} />,
    },
    {
      path: `${PATHS.HOME.IDENTITY}/${PATHS.HOME.CHECKOUT}`,
      element: <CheckoutPage options={options} clientSecret={clientSecret} />,
    },
    {
      path: `${PATHS.HOME.COMPLETED}`,
      element: <CompletePurchasePage />,
    },
  ],
});

const courseViewerRoute = {
  path: `/course/${PARAMETER.COURSEID}/session/${PARAMETER.SESSIONID}/learning/${PARAMETER.ID}`,
  element: <CourseViewer />,
};

const padiCourseDetailRoute = {
  path: `${PATHS.PROFILE.IDENTITY}/courses/${PARAMETER.ID}`,
  element: <PaidCourseDetail />,
};

const authRoute = {
  path: PATHS.AUTH.IDENTITY,
  element: <Auth_Layout />,
  children: [
    {
      path: `${PATHS.AUTH.LOGIN}`,
      element: <Login />,
    },
    {
      path: `${PATHS.AUTH.REGISTER}`,
      element: <Register />,
    },
  ],
};

const profileRoute = {
  path: `${PATHS.PROFILE.IDENTITY}/${PARAMETER.VALUE}`,
  element: <Profile_Layout />,
};

const courseGroupRoute = {
  path: `${PATHS.PROFILE.IDENTITY}/${PARAMETER.VALUE}/${PARAMETER.ID}`,
  element: <Profile_Layout />,
};

const tempRoute = {
  path: "/",
  element: <Navigate to={`${PATHS.PROFILE.IDENTITY}/courses`} replace />,
};

const notFoundRoute = {
  path: "*", // This wildcard path matches any route that doesn't exist
  element: <NotFoundPage />,
};

export default function AllRoutes() {
  //const [stripePromise, setStripePromise] = useState<Stripe | null>();
  const [clientSecret, setClientSecret] = useState("");

  const createOrder = async () => {
    console.log("start createOrder");
    try {
      // Create PaymentIntent from backend
      const response = await api.payment.createPayment();

      const newClientSecret = response?.clientSecret;
      if (newClientSecret) {
        setClientSecret(newClientSecret);
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const options: StripeElementsOptions = {
    clientSecret: clientSecret || undefined, // Ensures options only contain clientSecret when it's available
    appearance: {
      theme: "stripe",
    },
  };

  // Log after clientSecret state is updated
  useEffect(() => {
    if (clientSecret) {
      console.log("clientSecret updated:", clientSecret);
    }
  }, [clientSecret]);

  return useRoutes([
    homeRoute(createOrder, clientSecret, options),
    profileRoute,
    courseViewerRoute,
    authRoute,
    notFoundRoute,
    adminRoute,
    courseGroupRoute,
    padiCourseDetailRoute,
  ]);
}
