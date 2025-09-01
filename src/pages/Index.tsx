import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Shuffle, Globe, Sparkles } from "lucide-react";
import { mockFolktales, categories, regions, Folktale } from "@/data/folktales";
import { StoryCard } from "@/components/StoryCard";
import { SearchBar } from "@/components/SearchBar";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-folktales.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedStory, setSelectedStory] = useState<Folktale | null>(null);
  const { toast } = useToast();

  const filteredStories = useMemo(() => {
    return mockFolktales.filter((story) => {
      const matchesSearch = 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.themes.some(theme => theme.toLowerCase().includes(searchQuery.toLowerCase())) ||
        story.origin.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All Stories" || story.category === selectedCategory;
      const matchesRegion = selectedRegion === "All Regions" || story.region === selectedRegion;
      
      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [searchQuery, selectedCategory, selectedRegion]);

  const getRandomStory = () => {
    const randomIndex = Math.floor(Math.random() * mockFolktales.length);
    setSelectedStory(mockFolktales[randomIndex]);
    toast({
      title: "Random Story Selected!",
      description: `Now reading: ${mockFolktales[randomIndex].title}`,
    });
  };

  const handleStoryClick = (story: Folktale) => {
    setSelectedStory(story);
  };

  if (selectedStory) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button 
            variant="outline" 
            onClick={() => setSelectedStory(null)}
            className="mb-6 hover:bg-secondary"
          >
            ← Back to Library
          </Button>
          
          <article className="bg-card rounded-lg shadow-story p-8 border border-parchment-dark/20">
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-story-gold-light text-primary">
                  {selectedStory.category}
                </Badge>
                <Badge variant="outline" className="border-sage-light bg-sage-light/20 text-sage">
                  {selectedStory.region}
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold mb-3 text-foreground">
                {selectedStory.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-4">
                A folktale from {selectedStory.origin}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Reading time: {selectedStory.readingTime} minutes</span>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex flex-wrap gap-1">
                  {selectedStory.themes.map((theme) => (
                    <span key={theme} className="text-sage">#{theme}</span>
                  ))}
                </div>
              </div>
            </header>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg font-medium text-primary mb-6 italic border-l-4 border-story-gold pl-4">
                {selectedStory.summary}
              </p>
              
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {selectedStory.content}
              </div>
            </div>
            
            <footer className="mt-8 pt-6 border-t border-parchment-dark/20">
              <Button 
                onClick={() => setSelectedStory(null)}
                className="bg-gradient-hero hover:opacity-90 text-primary-foreground"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Explore More Stories
              </Button>
            </footer>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="bg-gradient-hero text-primary-foreground py-20 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-story-gold" />
            <h1 className="text-5xl font-bold mb-6">
              Folktales Canvas
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover timeless folktales from around the world. Immerse yourself in the wisdom, magic, and wonder of traditional stories passed down through generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="secondary"
                onClick={getRandomStory}
                className="bg-story-gold hover:bg-story-gold-light text-primary font-semibold"
              >
                <Shuffle className="w-5 h-5 mr-2" />
                Random Story
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Globe className="w-5 h-5 mr-2" />
                Explore by Region
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by title, theme, or origin..."
              />
              
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-primary hover:bg-primary-glow" : ""}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <Separator orientation="vertical" className="hidden lg:block h-8" />
                
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <Button
                      key={region}
                      variant={selectedRegion === region ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center text-muted-foreground">
              <p>Found {filteredStories.length} stories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredStories.length === 0 ? (
              <Card className="text-center py-12">
                <CardHeader>
                  <CardTitle>No Stories Found</CardTitle>
                  <CardDescription>
                    Try adjusting your search or filter criteria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Stories");
                    setSelectedRegion("All Regions");
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onClick={() => handleStoryClick(story)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-parchment-dark/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Discover the world's wisdom through folktales. Connect to{" "}
            <span className="text-primary font-semibold">Supabase</span> to save favorites and unlock more features.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
