import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

const Signup = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <LoginForm 
      onToggleMode={() => setIsSignUp(!isSignUp)} 
      isSignUp={isSignUp} 
    />
  );
};

export default Signup;