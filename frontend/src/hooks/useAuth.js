import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authRequest = async (mode, name) => {
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setUser(data.user);
      setMessage(data.message);

      return data.user;

    } catch (err) {
      setMessage(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const login = (name) => authRequest("login", name);
  const signup = (name) => authRequest("signup", name);

  return {
    user,
    message,
    isLoading,
    login,
    signup
  };
};