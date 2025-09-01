import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <LoginForm 
      onToggleMode={() => setIsSignUp(!isSignUp)} 
      isSignUp={isSignUp} 
    />
  );
};

export default Login;