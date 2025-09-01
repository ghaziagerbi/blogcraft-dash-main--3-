// INACTIVE BUILD CODE - NOT BEING USED
// This file contains Supabase-dependent code that has been replaced with mock data

/*
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchPosts, fetchCategories, fetchTags } from "@/lib/api";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
  category: {
    name: string;
    slug: string;
  };
  tags: Array<{
    name: string;
    slug: string;
  }>;
  featuredPost: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export default function BlogHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const postsData = await fetchPosts(5);
        setPosts(postsData || []);

        const categoriesData = await fetchCategories();
        setCategories(categoriesData || []);

        const tagsData = await fetchTags();
        setTags(tagsData || []);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const featuredPost = posts.find(post => post.featuredPost);
  const regularPosts = posts.filter(post => !post.featuredPost);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Discover insights, tutorials, and stories from our community.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <Card className="mb-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 lg:p-8">
              <Badge variant="secondary" className="mb-4">
                Featured
              </Badge>
              <CardTitle className="text-2xl lg:text-3xl mb-4">
                {featuredPost.title}
              </CardTitle>
              <CardDescription className="text-lg mb-6">
                {featuredPost.excerpt}
              </CardDescription>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {featuredPost.author.name}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(featuredPost.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <Link to={`/blog/post/${featuredPost.slug}`}>
                <Button>Read More</Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 lg:p-8 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-xl font-semibold mb-2">Featured Content</h3>
                <p className="text-blue-100">
                  Highlighted stories and insights
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Regular Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {regularPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{post.category.name}</Badge>
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
              </div>
              <CardTitle className="line-clamp-2">
                <Link to={`/blog/post/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {post.author.name}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Browse posts by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/blog/category/${category.slug}`}
                  className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary">{category.postCount}</Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Tags</CardTitle>
            <CardDescription>
              Explore topics by tag
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 10).map((tag) => (
                <Link
                  key={tag.id}
                  to={`/blog/tag/${tag.slug}`}
                  className="inline-block"
                >
                  <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    {tag.name} ({tag.postCount})
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
*/
