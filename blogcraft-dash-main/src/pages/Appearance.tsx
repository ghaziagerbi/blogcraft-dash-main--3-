import { useState } from "react";
import { 
  Palette, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Save, 
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Sun,
  Moon,
  Monitor as MonitorIcon
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

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  fontFamily: string;
  fontSize: string;
  layout: 'wide' | 'narrow' | 'sidebar';
  headerStyle: 'minimal' | 'centered' | 'full';
  footerEnabled: boolean;
  sidebarEnabled: boolean;
  logo: string;
  favicon: string;
  customCSS: string;
  showAuthorBio: boolean;
  showRelatedPosts: boolean;
  showSocialShare: boolean;
  showReadingTime: boolean;
  showTableOfContents: boolean;
}

const defaultSettings: AppearanceSettings = {
  theme: 'light',
  primaryColor: '#3b82f6',
  fontFamily: 'Inter',
  fontSize: 'medium',
  layout: 'wide',
  headerStyle: 'centered',
  footerEnabled: true,
  sidebarEnabled: true,
  logo: '/lovable-uploads/b0c00b55-d393-495d-b9e7-ca27a59bd8cf.png',
  favicon: '/favicon.ico',
  customCSS: '',
  showAuthorBio: true,
  showRelatedPosts: true,
  showSocialShare: true,
  showReadingTime: true,
  showTableOfContents: false,
};

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro' },
];

const fontSizeOptions = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'x-large', label: 'Extra Large' },
];

const layoutOptions = [
  { value: 'wide', label: 'Wide', icon: Monitor },
  { value: 'narrow', label: 'Narrow', icon: Tablet },
  { value: 'sidebar', label: 'With Sidebar', icon: Smartphone },
];

const headerStyleOptions = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'centered', label: 'Centered' },
  { value: 'full', label: 'Full Width' },
];

export default function Appearance() {
  const [settings, setSettings] = useState<AppearanceSettings>(defaultSettings);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your blog appearance has been updated successfully.",
    });
  };

  const handleResetSettings = () => {
    setSettings(defaultSettings);
    toast({
      title: "Settings Reset",
      description: "Appearance settings have been reset to defaults.",
    });
  };

  const handleFileUpload = (field: 'logo' | 'favicon') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSettings(prev => ({ ...prev, [field]: url }));
      toast({
        title: "File Uploaded",
        description: `${field === 'logo' ? 'Logo' : 'Favicon'} has been uploaded successfully.`,
      });
    }
  };

  const getPreviewClass = () => {
    switch (previewMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-md';
      default: return 'max-w-4xl';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appearance</h1>
          <p className="text-muted-foreground">
            Customize your blog's look and feel
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleResetSettings}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="colors">Colors & Typography</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Choose your preferred theme mode
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <Select value={settings.theme} onValueChange={(value: 'light' | 'dark' | 'auto') => setSettings(prev => ({ ...prev, theme: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center space-x-2">
                          <Sun className="h-4 w-4" />
                          <span>Light</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center space-x-2">
                          <Moon className="h-4 w-4" />
                          <span>Dark</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="auto">
                        <div className="flex items-center space-x-2">
                          <MonitorIcon className="h-4 w-4" />
                          <span>Auto</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>
                  Upload your logo and favicon
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={settings.logo} 
                      alt="Logo" 
                      className="h-12 w-auto border rounded"
                    />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('logo-upload')?.click()}>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload('logo')}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={settings.favicon} 
                      alt="Favicon" 
                      className="h-8 w-8 border rounded"
                    />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('favicon-upload')?.click()}>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    <input
                      id="favicon-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload('favicon')}
                      className="hidden"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Colors</CardTitle>
                <CardDescription>
                  Customize your color scheme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>
                  Choose your fonts and sizes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select value={settings.fontFamily} onValueChange={(value) => setSettings(prev => ({ ...prev, fontFamily: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map(font => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select value={settings.fontSize} onValueChange={(value) => setSettings(prev => ({ ...prev, fontSize: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontSizeOptions.map(size => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Layout Options</CardTitle>
                <CardDescription>
                  Choose your preferred layout style
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Main Layout</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {layoutOptions.map(layout => {
                      const Icon = layout.icon;
                      return (
                        <button
                          key={layout.value}
                          onClick={() => setSettings(prev => ({ ...prev, layout: layout.value as any }))}
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            settings.layout === layout.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <Icon className="mx-auto h-6 w-6 mb-2" />
                          <span className="text-sm font-medium">{layout.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Header Style</Label>
                  <Select value={settings.headerStyle} onValueChange={(value: 'minimal' | 'centered' | 'full') => setSettings(prev => ({ ...prev, headerStyle: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {headerStyleOptions.map(style => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>
                  Enable or disable layout components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Footer</Label>
                    <p className="text-sm text-muted-foreground">
                      Show footer on all pages
                    </p>
                  </div>
                  <Switch
                    checked={settings.footerEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, footerEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sidebar</Label>
                    <p className="text-sm text-muted-foreground">
                      Show sidebar on blog pages
                    </p>
                  </div>
                  <Switch
                    checked={settings.sidebarEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sidebarEnabled: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Display</CardTitle>
              <CardDescription>
                Configure how content is displayed on your blog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Author Bio</Label>
                    <p className="text-sm text-muted-foreground">
                      Show author information on posts
                    </p>
                  </div>
                  <Switch
                    checked={settings.showAuthorBio}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showAuthorBio: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Related Posts</Label>
                    <p className="text-sm text-muted-foreground">
                      Show related posts at the bottom
                    </p>
                  </div>
                  <Switch
                    checked={settings.showRelatedPosts}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showRelatedPosts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Social Share</Label>
                    <p className="text-sm text-muted-foreground">
                      Show social sharing buttons
                    </p>
                  </div>
                  <Switch
                    checked={settings.showSocialShare}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showSocialShare: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reading Time</Label>
                    <p className="text-sm text-muted-foreground">
                      Show estimated reading time
                    </p>
                  </div>
                  <Switch
                    checked={settings.showReadingTime}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showReadingTime: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Table of Contents</Label>
                    <p className="text-sm text-muted-foreground">
                      Show table of contents on long posts
                    </p>
                  </div>
                  <Switch
                    checked={settings.showTableOfContents}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showTableOfContents: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom CSS</CardTitle>
              <CardDescription>
                Add custom CSS to further customize your blog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={settings.customCSS}
                onChange={(e) => setSettings(prev => ({ ...prev, customCSS: e.target.value }))}
                placeholder="/* Add your custom CSS here */"
                rows={8}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Live Preview</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewMode === 'tablet' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('tablet')}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Preview how your blog will look with current settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`mx-auto border rounded-lg bg-background ${getPreviewClass()}`}>
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <img src={settings.logo} alt="Logo" className="h-8 w-auto" />
                    <div className="flex items-center space-x-4 text-sm">
                      <span>Home</span>
                      <span>Blog</span>
                      <span>About</span>
                      <span>Contact</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Sample Blog Post</h1>
                  <p className="text-muted-foreground mb-4">
                    This is a preview of how your blog will look with the current appearance settings.
                  </p>
                  <div className="space-y-2">
                    <p>Font Family: {settings.fontFamily}</p>
                    <p>Font Size: {settings.fontSize}</p>
                    <p>Layout: {settings.layout}</p>
                    <p>Header Style: {settings.headerStyle}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
