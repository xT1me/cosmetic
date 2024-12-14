import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Main from "./components/Main/Main.jsx";
import AdminOrdersTable from "./components/AdminPanel/AdminPanel.jsx";
import { checkAuth } from "./api/auth/auth.js";
import { userActions } from "./components/redux/user/userActions.js";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const userReducer = new userActions(dispatch);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    checkIsAuth();
  }, []);

  const checkIsAuth = async () => {
    try {
      const authData = await checkAuth();
      authData
        ? userReducer.setUser(authData.userId)
        : userReducer.logoutAccount();
    } catch (error) {
      console.error(error);
    }
  };

  const ProtectedRoute = ({ element, condition, redirectTo }) => {
    return condition ? element : <Navigate to={redirectTo} />;
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute
              element={<AdminOrdersTable />}
              condition={user?.isAdmin}
              redirectTo="/"
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
