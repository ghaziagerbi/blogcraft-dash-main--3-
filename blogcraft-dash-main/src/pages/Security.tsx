import { useState } from "react";
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  Save, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Settings,
  Activity,
  Download,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  requireSpecialChars: boolean;
  requireNumbers: boolean;
  requireUppercase: boolean;
  enableBruteForceProtection: boolean;
  enableRateLimiting: boolean;
  enableAuditLog: boolean;
  allowedFileTypes: string[];
  maxFileSize: number;
  enableCSRFProtection: boolean;
  enableXSSProtection: boolean;
  enableContentSecurityPolicy: boolean;
}

interface SecurityEvent {
  id: string;
  timestamp: string;
  event: string;
  user: string;
  ip: string;
  status: 'success' | 'warning' | 'error';
  details: string;
}

const defaultSecuritySettings: SecuritySettings = {
  twoFactorEnabled: false,
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  passwordMinLength: 8,
  requireSpecialChars: true,
  requireNumbers: true,
  requireUppercase: true,
  enableBruteForceProtection: true,
  enableRateLimiting: true,
  enableAuditLog: true,
  allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
  maxFileSize: 10,
  enableCSRFProtection: true,
  enableXSSProtection: true,
  enableContentSecurityPolicy: true,
};

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30:25',
    event: 'Login Success',
    user: 'admin@example.com',
    ip: '192.168.1.100',
    status: 'success',
    details: 'User logged in successfully'
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:25:10',
    event: 'Failed Login',
    user: 'unknown@example.com',
    ip: '203.0.113.45',
    status: 'error',
    details: 'Invalid password attempt'
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:20:15',
    event: 'Password Changed',
    user: 'user@example.com',
    ip: '192.168.1.101',
    status: 'success',
    details: 'Password updated successfully'
  },
  {
    id: '4',
    timestamp: '2024-01-15 14:15:30',
    event: 'Suspicious Activity',
    user: 'admin@example.com',
    ip: '198.51.100.67',
    status: 'warning',
    details: 'Multiple failed login attempts detected'
  },
  {
    id: '5',
    timestamp: '2024-01-15 14:10:45',
    event: 'File Upload',
    user: 'editor@example.com',
    ip: '192.168.1.102',
    status: 'success',
    details: 'Image uploaded: hero-banner.jpg'
  }
];

export default function Security() {
  const [settings, setSettings] = useState<SecuritySettings>(defaultSecuritySettings);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(mockSecurityEvents);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security configuration has been updated successfully.",
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < settings.passwordMinLength) {
      toast({
        title: "Password Too Short",
        description: `Password must be at least ${settings.passwordMinLength} characters long.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <Badge variant="default">Success</Badge>;
      case 'warning': return <Badge variant="secondary">Warning</Badge>;
      case 'error': return <Badge variant="destructive">Error</Badge>;
      default: return <Badge variant="default">Success</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security</h1>
          <p className="text-muted-foreground">
            Manage your blog's security settings and monitor activity
          </p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="monitoring">Activity Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-green-600">85</div>
                <div className="flex-1">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Good security posture
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Active Sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Security Warnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Failed Attempts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Require a second factor for login
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, twoFactorEnabled: checked }))}
                  />
                </div>
                {settings.twoFactorEnabled && (
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Two-factor authentication is now enabled. Users will need to provide a second factor when logging in.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>
                  Control how long users stay logged in
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Select value={settings.sessionTimeout.toString()} onValueChange={(value) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Max Login Attempts</Label>
                  <Select value={settings.maxLoginAttempts.toString()} onValueChange={(value) => setSettings(prev => ({ ...prev, maxLoginAttempts: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
              <CardDescription>
                Configure password requirements for all users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Minimum Length</Label>
                  <Select value={settings.passwordMinLength.toString()} onValueChange={(value) => setSettings(prev => ({ ...prev, passwordMinLength: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 characters</SelectItem>
                      <SelectItem value="8">8 characters</SelectItem>
                      <SelectItem value="10">10 characters</SelectItem>
                      <SelectItem value="12">12 characters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.requireUppercase}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireUppercase: checked }))}
                    />
                    <Label>Require uppercase letters</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.requireNumbers}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireNumbers: checked }))}
                    />
                    <Label>Require numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.requireSpecialChars}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireSpecialChars: checked }))}
                    />
                    <Label>Require special characters</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your admin password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <Button onClick={handleChangePassword} disabled={!currentPassword || !newPassword || !confirmPassword}>
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Brute Force Protection</CardTitle>
                <CardDescription>
                  Prevent automated login attempts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Protection</Label>
                    <p className="text-sm text-muted-foreground">
                      Block IPs after failed attempts
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableBruteForceProtection}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableBruteForceProtection: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rate Limiting</CardTitle>
                <CardDescription>
                  Limit requests per time period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">
                      Prevent abuse and DDoS attacks
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableRateLimiting}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableRateLimiting: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>File Upload Security</CardTitle>
              <CardDescription>
                Control what files can be uploaded
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Maximum File Size (MB)</Label>
                  <Select value={settings.maxFileSize.toString()} onValueChange={(value) => setSettings(prev => ({ ...prev, maxFileSize: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 MB</SelectItem>
                      <SelectItem value="10">10 MB</SelectItem>
                      <SelectItem value="25">25 MB</SelectItem>
                      <SelectItem value="50">50 MB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Allowed File Types</Label>
                  <Input
                    value={settings.allowedFileTypes.join(', ')}
                    onChange={(e) => setSettings(prev => ({ ...prev, allowedFileTypes: e.target.value.split(',').map(t => t.trim()) }))}
                    placeholder="jpg, png, pdf, doc"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Headers</CardTitle>
              <CardDescription>
                Configure security headers for your blog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>CSRF Protection</Label>
                    <p className="text-sm text-muted-foreground">
                      Prevent cross-site request forgery
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableCSRFProtection}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableCSRFProtection: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>XSS Protection</Label>
                    <p className="text-sm text-muted-foreground">
                      Prevent cross-site scripting attacks
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableXSSProtection}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableXSSProtection: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Content Security Policy</Label>
                    <p className="text-sm text-muted-foreground">
                      Control resource loading
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableContentSecurityPolicy}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableContentSecurityPolicy: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Security Events</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Monitor security-related activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(event.status)}
                      <div>
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.user} • {event.ip} • {event.details}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(event.status)}
                      <span className="text-sm text-muted-foreground">{event.timestamp}</span>
                    </div>
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
