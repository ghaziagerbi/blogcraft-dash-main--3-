import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Tag, Calendar, Hash } from "lucide-react";
import { getAllTags } from "@/lib/mockData";

export default function BlogTags() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  
  const tags = getAllTags();

  // Filter tags based on search term
  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group tags by first letter
  const groupedTags: { [key: string]: any[] } = {};
  filteredTags.forEach(tag => {
    const firstLetter = tag.name.charAt(0).toUpperCase();
    if (!groupedTags[firstLetter]) {
      groupedTags[firstLetter] = [];
    }
    groupedTags[firstLetter].push(tag);
  });

  // Get unique first letters for filtering
  const uniqueLetters = Object.keys(groupedTags).sort();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Tags</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our content organized by tags. Click on any tag to see related posts.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Letter Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={selectedLetter === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedLetter(null)}
        >
          All
        </Button>
        {uniqueLetters.map(letter => (
          <Button
            key={letter}
            variant={selectedLetter === letter ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLetter(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>

      {/* Tags Grid */}
      <div className="space-y-8">
        {selectedLetter ? (
          // Show only selected letter
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tags starting with {selectedLetter}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedTags[selectedLetter].map(tag => (
                <Card key={tag.id} className="p-4 hover-lift transition-all duration-300">
                  <Link to={`/blog/tag/${tag.slug}`} className="block">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Hash className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{tag.name}</span>
                      </div>
                      <Badge variant="secondary">
                        {tag.posts_count} posts
                      </Badge>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Show all grouped tags
          Object.entries(groupedTags).map(([letter, tags]) => (
            <div key={letter}>
              <h2 className="text-2xl font-bold text-foreground mb-4">{letter}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tags.map(tag => (
                  <Card key={tag.id} className="p-4 hover-lift transition-all duration-300">
                    <Link to={`/blog/tag/${tag.slug}`} className="block">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Hash className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{tag.name}</span>
                        </div>
                        <Badge variant="secondary">
                          {tag.posts_count} posts
                        </Badge>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Popular Tags */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 15).map(tag => (
            <Link key={tag.id} to={`/blog/tag/${tag.slug}`}>
              <Badge 
                variant="outline" 
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag.name}
                <span className="ml-1 text-xs">({tag.posts_count})</span>
              </Badge>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
