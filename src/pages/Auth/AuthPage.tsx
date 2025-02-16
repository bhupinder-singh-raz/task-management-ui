import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Card, CardContent, Typography, Box, Snackbar } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContainer } from "./AuthPage.styles";
import { AuthSchema, AuthFormData, defaultValues } from "./constant";
import AxiosService, { SIGNIN_URL, SIGNUP_URL } from "../../services/api.service";
import { AxiosError } from "axios";

const defaultServerMessage = 'An unknown error occurred';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
    defaultValues,
  });

  const isSignup = location.pathname === "/signup";

  console.log(errors);

  const onSubmit = async (data: AuthFormData) => {
    try {
      setLoading(true);
      const endpoint = isSignup ? SIGNUP_URL : SIGNIN_URL;
      const api = new AxiosService();
      const response = await api.post<{ message: string }>(endpoint, data);
      switch (response.message) {
        case "Login successful":
          setSnackbar({ open: true, message: "Login successful", severity: "success" });
          navigate("/task");
          break;
      
        case "User registered successfully":
          setSnackbar({ open: true, message: "User registered successfully", severity: "success" });
          navigate("/signin");
          break;
      }
    } catch (error) {
      console.error("Auth Error:", error);
      const message = isSignup ? error instanceof AxiosError ? error?.response?.data?.message : defaultServerMessage : 'Incorrect email or password';
      setSnackbar({ open: true, message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <AuthContainer>
      <Card sx={{ maxWidth: 400, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ marginTop: 2 }}
            >
              {loading ? "Processing..." : isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </form>


          {isSignup &&
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', mt: 4, pr: '1rem' }}>
              <Link to="/signin"><Typography variant="body2">Already have an account? Sign in</Typography></Link>
            </Box>
          }

          <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbar.message} />

        </CardContent>
      </Card>
    </AuthContainer>
  );
}
