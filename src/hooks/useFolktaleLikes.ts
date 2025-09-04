import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useFolktaleLikes = () => {
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLikes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('folktale_likes')
        .select('folktale_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const likedIds = new Set(data.map(like => like.folktale_id));
      setLikedStories(likedIds);
    } catch (error) {
      console.error('Error fetching likes:', error);
      toast({
        title: "Error",
        description: "Failed to load your liked stories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (folktaleId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to like stories",
          variant: "destructive"
        });
        return;
      }

      const isLiked = likedStories.has(folktaleId);

      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from('folktale_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('folktale_id', folktaleId);

        if (error) throw error;

        setLikedStories(prev => {
          const newSet = new Set(prev);
          newSet.delete(folktaleId);
          return newSet;
        });

        toast({
          title: "Story unliked",
          description: "Removed from your favorites"
        });
      } else {
        // Add like
        const { error } = await supabase
          .from('folktale_likes')
          .insert({
            user_id: user.id,
            folktale_id: folktaleId
          });

        if (error) throw error;

        setLikedStories(prev => new Set([...prev, folktaleId]));

        toast({
          title: "Story liked!",
          description: "Added to your favorites"
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return {
    likedStories,
    loading,
    toggleLike,
    isLiked: (folktaleId: string) => likedStories.has(folktaleId)
  };
};