// INACTIVE BUILD CODE - NOT BEING USED
// This file contains Supabase-dependent code that has been replaced with mock data

/*
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, Eye, MessageSquare, Share2, Heart, ArrowLeft } from "lucide-react";
import { fetchPostBySlug, fetchComments, submitComment } from "../../lib/api";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: {
    name: string;
    slug: string;
  };
  tags: Array<{
    name: string;
    slug: string;
  }>;
  featuredImageUrl: string;
  views: number;
  commentsCount: number;
  featuredPost: boolean;
}

interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  createdAt: string;
  status: string;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    content: ""
  });

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const postData = await fetchPostBySlug(slug);
        
        if (postData) {
          setPost(postData);
          
          // Load comments
          const commentsData = await fetchComments(postData.id);
          setComments(commentsData || []);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!post) return;

    try {
      setSubmittingComment(true);
      
      const newComment = await submitComment({
        postId: post.id,
        authorName: commentForm.name,
        authorEmail: commentForm.email,
        content: commentForm.content
      });

      if (newComment) {
        setComments(prev => [...prev, newComment]);
        setCommentForm({ name: "", email: "", content: "" });
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The post you're looking for doesn't exist or hasn't been published yet.
        </p>
        <Link to="/blog">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link to="/blog" className="hover:text-foreground">Blog</Link>
          </li>
          <li>/</li>
          <li>
            <Link to={`/blog/category/${post.category.slug}`} className="hover:text-foreground">
              {post.category.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{post.title}</li>
        </ol>
      </nav>

      {/* Post Header */}
      <article className="mb-12">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{post.category.name}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.bio}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{comments.length} comments</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImageUrl && (
          <div className="mb-8">
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Post Footer */}
        <footer className="border-t pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Last updated: {formatDate(post.updatedAt)}
            </div>
          </div>
        </footer>
      </article>

      {/* Comments Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Your Name"
              value={commentForm.name}
              onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={commentForm.email}
              onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
              required
            />
          </div>
          <Textarea
            placeholder="Write your comment..."
            value={commentForm.content}
            onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
            rows={4}
            required
          />
          <Button type="submit" disabled={submittingComment}>
            {submittingComment ? "Submitting..." : "Post Comment"}
          </Button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-foreground">{comment.authorName}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-foreground">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
*/
