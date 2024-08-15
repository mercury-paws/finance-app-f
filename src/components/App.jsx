import TrackerPage from "../pages/TrackerPage/TrackerPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import NotFound from "./NotFound/NotFound.jsx";
import Edit from "./Modals/Edit/Edit.jsx";
import Add from "./Modals/Add/Add.jsx";
import Delete from "./Modals/Delete/Delete.jsx";
import LogOut from "./Modals/LogOut/LogOut.jsx";
import Setting from "./Modals/Setting/Setting.jsx";
// import { lazy, Suspense } from "react";

function App() {
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
          {/* modal routes to be edited */}
          <Route path="/edit" element={<Edit />} />
          <Route path="/add" element={<Add />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/setting" element={<Setting />} />
          {/* /modal routes to be edited */}
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
