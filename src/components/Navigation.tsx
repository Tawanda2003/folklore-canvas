import { Button } from "@/components/ui/button";
import { BookOpen, LogOut, User, StickyNote } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed Out",
        description: "You've been successfully signed out.",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error signing out.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-parchment-dark/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl text-primary">Folktales Canvas</span>
            </Link>
            
            {user && (
              <div className="flex items-center gap-6">
                <Link
                  to="/"
                  className={`text-sm transition-colors hover:text-primary ${
                    location.pathname === '/' ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  Stories
                </Link>
                <Link
                  to="/notes"
                  className={`text-sm transition-colors hover:text-primary flex items-center gap-2 ${
                    location.pathname === '/notes' ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  <StickyNote className="h-4 w-4" />
                  Notes
                </Link>
              </div>
            )}
          </div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="bg-gradient-hero hover:opacity-90">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};