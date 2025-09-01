import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Calendar, User, Eye, MessageSquare } from "lucide-react";
import { getPostsByTag, getAllTags } from "@/lib/mockData";

export default function BlogTagPage() {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  // Get tag information and posts
  const allTags = getAllTags();
  const tag = allTags.find(t => t.slug === slug);
  const posts = tag ? getPostsByTag(slug || '') : [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!tag) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-4">Tag Not Found</h1>
        <p className="text-muted-foreground">The tag you're looking for doesn't exist.</p>
        <Link to="/blog/tags" className="mt-4 inline-block">
          <Button>Back to Tags</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/blog/tags">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tags
        </Button>
      </Link>

      {/* Tag Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <span className="text-2xl font-bold text-primary">{tag.name}</span>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Posts related to <span className="font-medium">{tag.name}</span>
        </p>
        <Badge variant="secondary" className="text-sm">
          {tag.posts_count} posts
        </Badge>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts in this tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
        </h2>

        <div className="grid gap-6">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover-lift">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="relative h-48 md:h-full">
                  <img
                    src={post.featuredImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{post.category.name}</Badge>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-semibold text-foreground hover:text-primary transition-colors">
                      <Link to={`/blog/post/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tagItem: any) => (
                        <Link key={tagItem.slug} to={`/blog/tag/${tagItem.slug}`}>
                          <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                            {tagItem.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.commentsCount}</span>
                        </div>
                      </div>

                      <Link to={`/blog/post/${post.slug}`}>
                        <Button>
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts found for this tag.</p>
              <p className="text-sm text-muted-foreground mt-2">Try a different search term or browse all posts.</p>
            </div>
          )}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      </div>

      {/* Related Tags */}
      <Card className="p-6 bg-gradient-to-r from-secondary/20 to-accent/10">
        <h3 className="text-lg font-semibold text-foreground mb-4">Explore Other Tags</h3>
        <div className="flex flex-wrap gap-2">
          {/* This would be populated with related tags in a real implementation */}
          <Link to="/blog/tag/football">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Football
            </Badge>
          </Link>
          <Link to="/blog/tag/sports">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Sports
            </Badge>
          </Link>
          <Link to="/blog/tag/morocco">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Morocco
            </Badge>
          </Link>
        </div>
      </Card>
    </div>
  );
}
