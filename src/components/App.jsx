import { lazy, Suspense } from "react";

const TrackerPage = lazy(() => import("../pages/TrackerPage/TrackerPage.jsx"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp.jsx"));
const SignIn = lazy(() => import("../pages/SignIn/SignIn.jsx"));
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
const NotFound = lazy(() => import("./NotFound/NotFound.jsx"));
import { useDispatch, useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../redux/auth/selectors.js";
import { useEffect } from "react";
import { refreshUser } from "../redux/auth/operations.js";
import { selectIsRefreshing } from "../redux/auth/selectors.js";
import RestrictedRoute from "./RestrictedRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Layout>
        {/* {isRefreshing ? (
          <b>Refreshing user, please wait</b>
        ) : ( */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <RestrictedRoute
                  component={<HomePage />}
                  redirectTo="/tracker"
                />
              }
            >
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route
              path="/tracker"
              element={
                <PrivateRoute component={<TrackerPage />} redirectTo="/" />
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        {/* )} */}
      </Layout>
    </>
  );
}

export default App;
