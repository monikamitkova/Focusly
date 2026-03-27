import { useState } from "react";

export const useUserProgress = (initialUser) => {
  const [user, setUser] = useState(initialUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  const updateProgress = async (earnedXp, minutes) => {
    if (!user?.id) return null;

    setIsUpdating(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${user.id}/progress`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ earnedXp, minutes })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update progress");
      }

      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    user,
    setUser,
    updateProgress,
    isUpdating,
    error
  };
};
