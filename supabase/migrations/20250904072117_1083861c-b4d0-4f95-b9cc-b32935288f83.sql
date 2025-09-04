-- Create likes table for folktales
CREATE TABLE public.folktale_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  folktale_id UUID NOT NULL REFERENCES public.folktales(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, folktale_id)
);

-- Enable Row Level Security
ALTER TABLE public.folktale_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for likes
CREATE POLICY "Users can view their own likes" 
ON public.folktale_likes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own likes" 
ON public.folktale_likes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" 
ON public.folktale_likes 
FOR DELETE 
USING (auth.uid() = user_id);