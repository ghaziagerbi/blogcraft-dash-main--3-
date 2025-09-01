import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Eye, MessageSquare, Tag } from "lucide-react";

// Mock data for category posts
const categoryData = {
  "match-reports": {
    name: "Match Reports",
    description: "Detailed coverage of ASA matches, including analysis and highlights",
    posts: [
      {
        id: 1,
        title: "ASA Wins Championship Final Against Wydad Casablanca",
        slug: "asa-wins-championship-final-wydad",
        excerpt: "In a thrilling match that went into extra time, ASA secured their first championship title in over a decade with a spectacular 3-2 victory.",
        featuredImageUrl: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
        author: { name: "Ahmed Benali" },
        publishedAt: "2024-01-15T10:00:00Z",
        views: 2847,
        commentsCount: 45,
        tags: ["Championship", "Victory", "Wydad"]
      },
      {
        id: 2,
        title: "Derby Victory: ASA Defeats Local Rivals 2-1",
        slug: "derby-victory-asa-defeats-rivals",
        excerpt: "A hard-fought victory in the local derby showcases ASA's determination and skill against our traditional rivals.",
        featuredImageUrl: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg",
        author: { name: "Sara Alami" },
        publishedAt: "2024-01-10T16:30:00Z",
        views: 1456,
        commentsCount: 28,
        tags: ["Derby", "Victory", "Local Rivals"]
      },
      {
        id: 3,
        title: "Champions League Qualifier: ASA vs Al Ahly Preview",
        slug: "champions-league-qualifier-preview",
        excerpt: "Everything you need to know about ASA's upcoming Champions League qualifier against Egyptian giants Al Ahly.",
        featuredImageUrl: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg",
        author: { name: "Mohamed Tazi" },
        publishedAt: "2024-01-08T14:20:00Z",
        views: 1892,
        commentsCount: 34,
        tags: ["Champions League", "Al Ahly", "Preview"]
      }
    ]
  },
  "transfers": {
    name: "Transfers",
    description: "Latest news on player transfers, signings, and contract updates",
    posts: [
      {
        id: 4,
        title: "New Signing: Youssef Amrani Joins ASA",
        slug: "new-signing-youssef-amrani",
        excerpt: "The talented midfielder from Raja Casablanca brings experience and skill to strengthen our midfield for the upcoming season.",
        featuredImageUrl: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg",
        author: { name: "Fatima Zahra" },
        publishedAt: "2024-01-14T15:30:00Z",
        views: 1249,
        commentsCount: 23,
        tags: ["New Signing", "Midfielder", "Raja"]
      },
      {
        id: 5,
        title: "Contract Extension: Captain Extends Stay Until 2027",
        slug: "captain-contract-extension-2027",
        excerpt: "Our beloved captain has committed his future to ASA with a contract extension that will keep him at the club until 2027.",
        featuredImageUrl: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg",
        author: { name: "Hassan Benjelloun" },
        publishedAt: "2024-01-12T11:45:00Z",
        views: 987,
        commentsCount: 19,
        tags: ["Contract", "Captain", "Extension"]
      }
    ]
  }
};

export default function BlogCategoryPage() {
  const { slug } = useParams();
  const category = categoryData[slug as keyof typeof categoryData];

  if (!category) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Category Not Found</h1>
        <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
        <Link to="/blog/categories">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/blog/categories">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Button>
      </Link>

      {/* Category Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Tag className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{category.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{category.description}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm">
          {category.posts.length} posts in this category
        </Badge>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        {category.posts.map((post) => (
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
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author.name}</span>
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
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Posts
        </Button>
      </div>

      {/* Related Categories */}
      <Card className="p-6 bg-gradient-to-r from-secondary/20 to-accent/10">
        <h3 className="text-lg font-semibold text-foreground mb-4">Explore Other Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Link to="/blog/category/transfers">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Transfers
            </Badge>
          </Link>
          <Link to="/blog/category/training">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Training
            </Badge>
          </Link>
          <Link to="/blog/category/youth">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Youth Academy
            </Badge>
          </Link>
          <Link to="/blog/category/community">
            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              Community
            </Badge>
          </Link>
        </div>
      </Card>
    </div>
  );
}