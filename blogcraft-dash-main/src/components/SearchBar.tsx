import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { searchPosts } from "@/lib/api";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const searchResults = await searchPosts(query, 5);
      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (slug: string) => {
    navigate(`/blog/post/${slug}`);
    setShowResults(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) {
              setShowResults(true);
            }
          }}
          onKeyDown={handleKeyDown}
          className="pl-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => setQuery("")}
          >
            ×
          </Button>
        )}
      </form>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  className="flex items-center w-full p-3 hover:bg-secondary transition-colors text-left"
                  onClick={() => handleResultClick(result.slug)}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {result.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {result.excerpt}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <span>{result.category.name}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query && (
            <div className="p-4 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
