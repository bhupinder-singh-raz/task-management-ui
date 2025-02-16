import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { StyledLogoutButton } from "./LogoutButton.styles";
import AxiosService from "../../../../services/api.service";

interface LogoutButtonProps {
  onLogout?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const api = new AxiosService();
      await api.post("/auth/signout", {}, { withCredentials: true });

      if (onLogout) onLogout();

      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, onLogout]);

  return (
    <StyledLogoutButton onClick={handleLogout} disabled={loading} variant="contained">
      {loading ? <CircularProgress size={24} color="inherit" /> : "Logout"}
    </StyledLogoutButton>
  );
};

export default LogoutButton;
