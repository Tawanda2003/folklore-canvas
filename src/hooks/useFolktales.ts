import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Folktale {
  id: string;
  title: string;
  origin: string;
  region: string;
  category: string;
  summary: string;
  content: string;
  themes: string[];
  readingTime: number;
}

export const useFolktales = () => {
  const [folktales, setFolktales] = useState<Folktale[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFolktales();
  }, []);

  const fetchFolktales = async () => {
    try {
      const { data, error } = await supabase
        .from('folktales')
        .select('*');

      if (error) {
        console.error('Error fetching folktales:', error);
        toast({
          title: "Error",
          description: "Failed to load folktales from database.",
          variant: "destructive",
        });
        return;
      }

      // Transform database data to match app interface
      const transformedFolktales: Folktale[] = (data || []).map((item) => ({
        id: item.id,
        title: item.title || "Untitled Story",
        origin: item.source || item.nation || "Unknown",
        region: item.nation || "Unknown Region",
        category: "Folktale", // Default category since it's not in DB
        summary: item.text ? item.text.substring(0, 200) + "..." : "No summary available",
        content: item.text || "Content not available",
        themes: [], // Empty array since themes not in DB
        readingTime: Math.ceil((item.text?.length || 0) / 200) || 3, // Estimate based on text length
      }));

      setFolktales(transformedFolktales);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading folktales.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { folktales, loading, refetch: fetchFolktales };
};