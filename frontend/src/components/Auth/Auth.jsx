import React, { useState } from "react";
import { login, register } from "../../api/auth/auth.js";
import Form from "../../ui/Form/Form.jsx";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/user/userActions.js";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography, Modal } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Auth = ({isOpen, setIsOpen}) => {
  const dispatch = useDispatch();
  const userReducer = new userActions(dispatch);
  const user = useSelector((state) => state.user.user);

  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");


  const fieldsForLogin = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const fieldsForRegister = [
    { name: "email", label: "Email", type: "email", required: true },
    ...fieldsForLogin,
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
  ];

  const toggleForm = () => {
    setIsRegistering((prevState) => !prevState);
    setError("");
  };

  const handleSubmit = async (formData) => {
    try {
      setError("");
      if (isRegistering) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
        await register(formData.username, formData.email, formData.password);
      }

      const loginData = await login(formData.username, formData.password);
      userReducer.setUser(loginData.userId);

      setIsOpen(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  const toggleModal = () => setIsOpen((prevState) => !prevState);

  const logout = () => {
    userReducer.logoutAccount();
  };

  return (
    <>
      <IconButton sx={{ color: "icon.light" }} onClick={user ? logout : toggleModal}>
        {user ? <ExitToAppIcon /> : <AccountCircleIcon />}
      </IconButton>
      
      <Modal open={isOpen} onClose={toggleModal} aria-labelledby="auth-form-title">
        <div style={modalStyles.container}>
          <IconButton onClick={toggleModal} style={modalStyles.closeButton}>
            <CloseIcon />
          </IconButton>
          <Typography id="auth-form-title" variant="h6" component="h2" gutterBottom style={modalStyles.title}>
            {isRegistering ? "Register" : "Login"}
          </Typography>
          <Form
            fields={isRegistering ? fieldsForRegister : fieldsForLogin}
            onSubmit={handleSubmit}
            title=""
            buttonText={isRegistering ? "Register" : "Login"}
            additionalContent={
              <Typography onClick={toggleForm} style={modalStyles.toggleText}>
                {isRegistering
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Typography>
            }
            errorMessage={
              error && (
                <Typography style={modalStyles.errorText} variant="body2">
                  {error}
                </Typography>
              )
            }
          />
        </div>
      </Modal>
    </>
  );
};

const modalStyles = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "24px",
    width: "450px",
  },
  closeButton: {
    position: "absolute",
    top: "8px",
    right: "8px",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  toggleText: {
    cursor: "pointer",
    color: "#1976d2",
    marginTop: "16px",
  },
  errorText: {
    color: "#d32f2f",
    marginTop: "16px",
  },
};

export default Auth;
