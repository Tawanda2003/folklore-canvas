import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, BookOpen, Heart } from "lucide-react";
import { Folktale } from "@/data/folktales";
import { useFolktaleLikes } from "@/hooks/useFolktaleLikes";

interface StoryCardProps {
  story: Folktale;
  onClick: () => void;
}

export const StoryCard = ({ story, onClick }: StoryCardProps) => {
  const { toggleLike, isLiked } = useFolktaleLikes();
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(story.id);
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-story bg-gradient-card border-parchment-dark/20 hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
            {story.title}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0 bg-story-gold-light text-primary">
            {story.category}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {story.origin}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {story.readingTime} min
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
          {story.summary}
        </p>
        <div className="flex flex-wrap gap-1">
          {story.themes.slice(0, 3).map((theme) => (
            <Badge 
              key={theme} 
              variant="outline" 
              className="text-xs border-sage-light bg-sage-light/20 text-sage hover:bg-sage-light/40"
            >
              {theme}
            </Badge>
          ))}
          {story.themes.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{story.themes.length - 3}
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLikeClick}
            className={`p-2 ${isLiked(story.id) ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
          >
            <Heart className={`w-4 h-4 ${isLiked(story.id) ? 'fill-current' : ''}`} />
          </Button>
          <div className="flex items-center text-primary group-hover:text-primary-glow transition-colors">
            <BookOpen className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Read Story</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};