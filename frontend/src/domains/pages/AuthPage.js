import { useState } from "react";

import AuthScene from "../components/auth/AuthScene";

const AUTH_COPY = {
  login: {
    mode: "login",
    title: "Welcome Back",
    subtitle: "Continue your productivity journey",
    buttonLabel: "Log In",
    toggleLabel: "Sign up here",
    togglePrompt: "Don't have an account?"
  },
  signup: {
    mode: "signup",
    title: "Create Account",
    subtitle: "Start your quest to better focus",
    buttonLabel: "Sign Up",
    toggleLabel: "Log in here",
    togglePrompt: "Already have an account?"
  }
};

export default function AuthPage({ onLogin }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authContent = AUTH_COPY[mode];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(data.message);

      if (mode === "login" && typeof onLogin === "function") {
        onLogin(data.user);
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleMode = () => {
    setMessage("");
    setMode((currentMode) => (currentMode === "login" ? "signup" : "login"));
  };

  return (
    <AuthScene
      content={authContent}
      isSubmitting={isSubmitting}
      message={message}
      name={name}
      onNameChange={setName}
      onSubmit={handleSubmit}
      onToggleMode={handleToggleMode}
    />
  );
}
