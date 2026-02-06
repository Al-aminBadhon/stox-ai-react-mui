import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";

interface User {
  email: string;
  name: string;
  mobile: string;
  isVerified: number;
}

export const useProfileFetch = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        const userData = res.data.user;

        if (userData.isVerified === 0) {
          navigate("/login");
          return;
        }

        setUser(userData);
      } catch (error) {
        console.error("Profile fetch failed", error);
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  return { user, loading };
};
