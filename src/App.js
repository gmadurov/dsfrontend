import "./App.css";

//functional import
import NavBar from "./pages/NavBar";
// import { isMobile } from "react-device-detect";
import { FullProvider } from "./context/FullContext";
import PrivateRoute from "./utils/PrivateRoute";
import Page from "./utils/Page";
import Declas from "./pages/Finance/Declas";
import { default as DeclaForm } from "./pages/Finance/DeclaForm";
import { default as Dsani } from "./pages/Dsani/Dsani";
import { default as EventForm } from "./pages/Events/EventForm";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { default as Events } from "./pages/Events/Events";
// extra imports
import LoginPage from "./pages/User/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Test from "./pages/Test";
import Footer from "./pages/Footer";
import Account from "./pages/User/Account";
import AccountForm from "./pages/User/AccountForm";
function App() {
  let NumberPerPage = 25
  return (
    <Router>
      <div className="cointainer  is-max-desktop has-text-centered">
        <FullProvider>
          <NavBar />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <PrivateRoute>
                  <Events NumberPerPage={NumberPerPage} />
                </PrivateRoute>
              }
            />
            <Route
              path="/agenda"
              element={
                <PrivateRoute>
                  <Page>
                    <Events NumberPerPage={NumberPerPage} />
                  </Page>
                </PrivateRoute>
              }
            />
            <Route
              path="/dsani"
              element={
                <PrivateRoute>
                  <Dsani NumberPerPage={NumberPerPage} />
                </PrivateRoute>
              }
            />
            <Route
              path="/addevent"
              element={
                <PrivateRoute>
                  <div className="container is-fluid">
                    <div className="columns is-centered">
                      <div className="column is-two-thirds">
                        <EventForm />
                      </div>
                    </div>
                  </div>
                </PrivateRoute>
              }
            />

            <Route
              path="/declas"
              element={
                <PrivateRoute>
                  <Declas NumberPerPage={NumberPerPage}  />
                </PrivateRoute>
              }
            />
            <Route
              path="/account/:id"
              element={
                <PrivateRoute>
                  <Page>
                    <Account />
                  </Page>
                </PrivateRoute>
              }
            />
            <Route
              path="/account/:id/edit"
              element={
                <PrivateRoute>
                  <Page>
                    <AccountForm />
                  </Page>
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/decla"
              element={
                <PrivateRoute>
                  <Page>
                    <DeclaForm />
                  </Page>
                </PrivateRoute>
              }
            /> */}
            <Route
              path="/decla/:id"
              element={
                <PrivateRoute>
                  <Page>
                    <DeclaForm />
                  </Page>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route
              path="*"
              element={
                <Page>
                  <h3> 404: unvalid url</h3>
                </Page>
              }
            />
          </Routes>
          <Footer />
        </FullProvider>
      </div>
    </Router>
  );
}

export default App;
