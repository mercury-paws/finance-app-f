import TrackerPage from "../pages/TrackerPage/TrackerPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import NotFound from "./NotFound/NotFound.jsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors.js";
// import { lazy, Suspense } from "react";

function App() {
  let isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Layout>
        {/* <Suspense fallback={null}> */}
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
          <Route path="/tracker" element={<TrackerPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </Suspense> */}
      </Layout>
    </>
  );
}

export default App;

{
  /* <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          /> */
}
