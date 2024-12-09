import React, { useState } from "react";
import { login, register } from "../../api/auth/auth";
import Form from "../../ui/Form/Form.jsx";

const AuthForm = ({ onAuthSuccess, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const fieldsForLogin = [
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const fieldsForRegister = [
    { name: "username", label: "Username", type: "text", required: true },
    ...fieldsForLogin,
    { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
  ];

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
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

        await register(formData.email, formData.username, formData.password);
        const user = await login(formData.email, formData.password);
        onAuthSuccess(user.username, user.id)
      } else {
        const user = await login(formData.email, formData.password);

        onAuthSuccess(user.username, user.id)
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred. Please try again.");
      } else {
        setError(err.message || "An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <Form
        fields={isRegistering ? fieldsForRegister : fieldsForLogin}
        onSubmit={handleSubmit}
        title={isRegistering ? "Register" : "Login"}
        buttonText={isRegistering ? "Register" : "Login"}
        onClose={onClose}
        additionalContent={<p onClick={toggleForm} className="toggle-form">
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>}
        errorMessage={error && <p className="error-message">{error}</p>}
      />
    </div>
  );
};

export default AuthForm;
