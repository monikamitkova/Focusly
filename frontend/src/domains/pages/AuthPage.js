import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

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
  const [mode, setMode] = useState("login");

  const { login, signup, message, isLoading } = useAuth();

  const authContent = AUTH_COPY[mode];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user =
      mode === "login"
        ? await login(name)
        : await signup(name);

    if (user && mode === "login" && typeof onLogin === "function") {
      onLogin(user);
    }
  };

  const handleToggleMode = () => {
    setMode((currentMode) => (currentMode === "login" ? "signup" : "login"));
  };

  return (
    <AuthScene
      content={authContent}
      isSubmitting={isLoading}
      message={message}       
      name={name}
      onNameChange={setName}
      onSubmit={handleSubmit}
      onToggleMode={handleToggleMode}
    />
  );
}