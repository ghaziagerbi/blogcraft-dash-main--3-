import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Clock,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{
    page: string;
    views: number;
    change: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
  deviceTypes: Array<{
    device: string;
    visitors: number;
    percentage: number;
  }>;
  recentActivity: Array<{
    time: string;
    action: string;
    user: string;
    page: string;
  }>;
}

const mockAnalyticsData: AnalyticsData = {
  pageViews: 12450,
  uniqueVisitors: 3420,
  bounceRate: 45.2,
  avgSessionDuration: 245,
  topPages: [
    { page: "/blog", views: 2340, change: 12.5 },
    { page: "/blog/post/1", views: 1890, change: -5.2 },
    { page: "/about", views: 1560, change: 8.7 },
    { page: "/contact", views: 890, change: 15.3 },
    { page: "/blog/category/tech", views: 670, change: -2.1 }
  ],
  trafficSources: [
    { source: "Organic Search", visitors: 1890, percentage: 55.3 },
    { source: "Direct", visitors: 890, percentage: 26.0 },
    { source: "Social Media", visitors: 450, percentage: 13.2 },
    { source: "Referral", visitors: 190, percentage: 5.5 }
  ],
  deviceTypes: [
    { device: "Desktop", visitors: 2050, percentage: 59.9 },
    { device: "Mobile", visitors: 1020, percentage: 29.8 },
    { device: "Tablet", visitors: 350, percentage: 10.3 }
  ],
  recentActivity: [
    { time: "2 min ago", action: "Page View", user: "Anonymous", page: "/blog/post/5" },
    { time: "5 min ago", action: "Comment", user: "john.doe@email.com", page: "/blog/post/3" },
    { time: "12 min ago", action: "Page View", user: "Anonymous", page: "/about" },
    { time: "18 min ago", action: "Like", user: "jane.smith@email.com", page: "/blog/post/2" },
    { time: "25 min ago", action: "Page View", user: "Anonymous", page: "/blog" }
  ]
};

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData);
  const [timeRange, setTimeRange] = useState<string>("7d");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate data refresh
      setData({
        ...mockAnalyticsData,
        pageViews: mockAnalyticsData.pageViews + Math.floor(Math.random() * 100),
        uniqueVisitors: mockAnalyticsData.uniqueVisitors + Math.floor(Math.random() * 50)
      });
      setIsLoading(false);
      toast({
        title: "Data Refreshed",
        description: "Analytics data has been updated successfully.",
      });
    }, 1000);
  };

  const exportData = () => {
    toast({
      title: "Export Started",
      description: "Your analytics data is being prepared for download.",
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your blog's performance and visitor behavior
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.pageViews)}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.uniqueVisitors)}</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.bounceRate}%</div>
            <p className="text-xs text-muted-foreground">
              -2.1% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(data.avgSessionDuration)}</div>
            <p className="text-xs text-muted-foreground">
              +5.3% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Traffic Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>
                Page views and unique visitors over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-secondary rounded-lg">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Chart visualization would be implemented here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Device Types */}
          <Card>
            <CardHeader>
              <CardTitle>Device Types</CardTitle>
              <CardDescription>
                Traffic breakdown by device type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.deviceTypes.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-sm font-medium">{device.device}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {formatNumber(device.visitors)} visitors
                      </span>
                      <Badge variant="secondary">{device.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>
                Where your visitors are coming from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium">{source.source}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(source.visitors)} visitors
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{source.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>
                Most visited pages on your blog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{page.page}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(page.views)} views
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getChangeIcon(page.change)}
                      <span className={`text-sm font-medium ${getChangeColor(page.change)}`}>
                        {page.change > 0 ? '+' : ''}{page.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Real-time visitor activity on your blog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.user} • {activity.page}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
