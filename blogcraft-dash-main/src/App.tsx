import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PublicLayout from "./components/PublicLayout";
import BlogHome from "./pages/blog/BlogHome";
import BlogPost from "./pages/blog/BlogPost";
import BlogCategories from "./pages/blog/BlogCategories";
import BlogCategoryPage from "./pages/blog/BlogCategoryPage";
import BlogAbout from "./pages/blog/BlogAbout";
import BlogPreview from "./pages/blog/BlogPreview";
import BlogTags from "./pages/blog/BlogTags";
import BlogTagPage from "./pages/blog/BlogTagPage";
import CommentsManager from "./components/admin/CommentsManager";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AdminUsers from "./pages/AdminUsers";
import Media from "./pages/Media";
import SEO from "./pages/SEO";
import Analytics from "./pages/Analytics";
import Appearance from "./pages/Appearance";
import Security from "./pages/Security";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Blog Routes */}
            <Route path="/blog" element={<PublicLayout />}>
              <Route index element={<BlogHome />} />
              <Route path="post/:slug" element={<BlogPost />} />
              <Route path="post/preview" element={<BlogPreview />} />
              <Route path="categories" element={<BlogCategories />} />
              <Route path="category/:slug" element={<BlogCategoryPage />} />
              <Route path="tags" element={<BlogTags />} />
              <Route path="tag/:slug" element={<BlogTagPage />} />
              <Route path="about" element={<BlogAbout />} />
            </Route>
            
            {/* Redirect root to blog */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<BlogHome />} />
            </Route>
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Admin Routes - Protected */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="posts" element={<Posts />} />
              <Route path="users" element={<Users />} />
              <Route path="admin-users" element={<AdminUsers />} />
              <Route path="settings" element={<Settings />} />
              <Route path="categories" element={<Categories />} />
              <Route path="comments" element={<CommentsManager />} />
              <Route path="media" element={<Media />} />
              <Route path="seo" element={<SEO />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="appearance" element={<Appearance />} />
              <Route path="security" element={<Security />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
