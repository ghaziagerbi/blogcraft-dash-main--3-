import { useState } from "react";
import { 
  Search, 
  Settings, 
  FileText, 
  Globe, 
  BarChart3, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Edit,
  Save,
  Download,
  RefreshCw,
  Eye,
  Code,
  Link,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  author: string;
  robots: string;
  googleAnalytics: string;
  googleSearchConsole: string;
  enableSitemap: boolean;
  enableRobotsTxt: boolean;
  enableOpenGraph: boolean;
  enableTwitterCards: boolean;
}

interface SEOAnalysis {
  score: number;
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    message: string;
    suggestion: string;
  }>;
}

const defaultSEOSettings: SEOSettings = {
  siteTitle: "BlogCraft - Your Blog Platform",
  siteDescription: "A modern blog platform for content creators and writers",
  keywords: "blog, content, writing, platform, modern",
  author: "BlogCraft Team",
  robots: "index, follow",
  googleAnalytics: "",
  googleSearchConsole: "",
  enableSitemap: true,
  enableRobotsTxt: true,
  enableOpenGraph: true,
  enableTwitterCards: true,
};

export default function SEO() {
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(defaultSEOSettings);
  const [analysis, setAnalysis] = useState<SEOAnalysis>({
    score: 85,
    issues: [
      {
        type: 'warning',
        message: 'Meta description is too short',
        suggestion: 'Add more descriptive content to your meta description (150-160 characters recommended)'
      },
      {
        type: 'info',
        message: 'Google Analytics not configured',
        suggestion: 'Add your Google Analytics tracking ID for better insights'
      },
      {
        type: 'error',
        message: 'Missing Open Graph tags',
        suggestion: 'Enable Open Graph tags for better social media sharing'
      }
    ]
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "SEO Settings Saved",
      description: "Your SEO configuration has been updated successfully.",
    });
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const newScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
      setAnalysis({
        score: newScore,
        issues: [
          {
            type: 'warning',
            message: 'Meta description could be more compelling',
            suggestion: 'Make your meta description more engaging to improve click-through rates'
          },
          {
            type: 'info',
            message: 'Consider adding structured data',
            suggestion: 'Implement JSON-LD structured data for better search engine understanding'
          }
        ]
      });
      setIsAnalyzing(false);
      toast({
        title: "SEO Analysis Complete",
        description: `Your site scored ${newScore}/100. Check the issues below for improvements.`,
      });
    }, 2000);
  };

  const generateSitemap = () => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourblog.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourblog.com/blog</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Sitemap Generated",
      description: "sitemap.xml has been downloaded successfully.",
    });
  };

  const generateRobotsTxt = () => {
    const robotsContent = `User-agent: *
Allow: /

Sitemap: https://yourblog.com/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /login/
Disallow: /register/`;

    const blob = new Blob([robotsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Robots.txt Generated",
      description: "robots.txt has been downloaded successfully.",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Management</h1>
          <p className="text-muted-foreground">
            Optimize your blog for search engines and social media
          </p>
        </div>
        <Button onClick={runAnalysis} disabled={isAnalyzing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* SEO Score Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                SEO Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold">
                  <span className={getScoreColor(analysis.score)}>{analysis.score}</span>
                  <span className="text-muted-foreground">/100</span>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${analysis.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {analysis.score >= 90 ? 'Excellent' : 
                     analysis.score >= 70 ? 'Good' : 
                     analysis.score >= 50 ? 'Fair' : 'Needs Improvement'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">1,234</p>
                    <p className="text-sm text-muted-foreground">Page Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">567</p>
                    <p className="text-sm text-muted-foreground">Organic Clicks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">89</p>
                    <p className="text-sm text-muted-foreground">Keywords Ranked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic SEO Settings</CardTitle>
              <CardDescription>
                Configure your site's basic SEO information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={seoSettings.siteTitle}
                    onChange={(e) => setSeoSettings(prev => ({ ...prev, siteTitle: e.target.value }))}
                    placeholder="Your site title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={seoSettings.author}
                    onChange={(e) => setSeoSettings(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Site author"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Meta Description</Label>
                <Textarea
                  id="siteDescription"
                  value={seoSettings.siteDescription}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                  placeholder="Brief description of your site"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {seoSettings.siteDescription.length}/160 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={seoSettings.keywords}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="robots">Robots Meta Tag</Label>
                <Select value={seoSettings.robots} onValueChange={(value) => setSeoSettings(prev => ({ ...prev, robots: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="index, follow">Index, Follow</SelectItem>
                    <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                    <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                    <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                <Input
                  id="googleAnalytics"
                  value={seoSettings.googleAnalytics}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, googleAnalytics: e.target.value }))}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleSearchConsole">Google Search Console</Label>
                <Input
                  id="googleSearchConsole"
                  value={seoSettings.googleSearchConsole}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, googleSearchConsole: e.target.value }))}
                  placeholder="Search Console verification code"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Sitemap</Label>
                  <p className="text-sm text-muted-foreground">
                    Generate XML sitemap for search engines
                  </p>
                </div>
                <Switch
                  checked={seoSettings.enableSitemap}
                  onCheckedChange={(checked) => setSeoSettings(prev => ({ ...prev, enableSitemap: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Robots.txt</Label>
                  <p className="text-sm text-muted-foreground">
                    Generate robots.txt file
                  </p>
                </div>
                <Switch
                  checked={seoSettings.enableRobotsTxt}
                  onCheckedChange={(checked) => setSeoSettings(prev => ({ ...prev, enableRobotsTxt: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Open Graph Tags</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable social media sharing optimization
                  </p>
                </div>
                <Switch
                  checked={seoSettings.enableOpenGraph}
                  onCheckedChange={(checked) => setSeoSettings(prev => ({ ...prev, enableOpenGraph: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Twitter Cards</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable Twitter card optimization
                  </p>
                </div>
                <Switch
                  checked={seoSettings.enableTwitterCards}
                  onCheckedChange={(checked) => setSeoSettings(prev => ({ ...prev, enableTwitterCards: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSaveSettings} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save SEO Settings
          </Button>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Issues</CardTitle>
              <CardDescription>
                Review and fix SEO issues found on your site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.issues.map((issue, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1">
                      <p className="font-medium">{issue.message}</p>
                      <p className="text-sm text-muted-foreground">{issue.suggestion}</p>
                    </div>
                    <Badge variant={issue.type === 'error' ? 'destructive' : issue.type === 'warning' ? 'secondary' : 'default'}>
                      {issue.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Sitemap Generator
                </CardTitle>
                <CardDescription>
                  Generate XML sitemap for search engines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={generateSitemap} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Sitemap
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Robots.txt Generator
                </CardTitle>
                <CardDescription>
                  Generate robots.txt file for search engines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={generateRobotsTxt} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Robots.txt
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Meta Tag Preview</CardTitle>
              <CardDescription>
                See how your site appears in search results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="space-y-2">
                  <p className="text-blue-600 text-sm truncate">
                    {seoSettings.siteTitle}
                  </p>
                  <p className="text-green-700 text-lg font-medium">
                    {seoSettings.siteTitle}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {seoSettings.siteDescription}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
