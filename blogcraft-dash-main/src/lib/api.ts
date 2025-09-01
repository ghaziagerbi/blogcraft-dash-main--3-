// API service to fetch data from the Admin Panel

import { supabase } from '../integrations/supabase/client';

// Types for our API responses
export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImageUrl: string;
  author: {
    id: number;
    name: string;
    bio: string | null;
    avatar: string | null;
  };
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string;
  };
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  publishedAt: string | null;
  updatedAt: string;
  views: number;
  commentsCount: number;
  readingTime: number;
  metaTitle: string;
  metaDescription: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  postsCount: number;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  postsCount: number;
}

export interface Comment {
  id: number;
  postId: number;
  authorName: string;
  authorEmail: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: {
    name: string;
    slug: string;
  };
  publishedAt: string;
}

// Fetch posts from the database
export const fetchPosts = async (limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image_url,
      author: authors (id, name, bio, avatar),
      category: categories (id, name, slug, description, color),
      tags: post_tags (tags (id, name, slug)),
      status,
      published_at,
      updated_at,
      views,
      comments_count,
      reading_time,
      meta_title,
      meta_description
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  // Transform the data to match our interface
  return data.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImageUrl: post.featured_image_url,
    author: post.author,
    category: post.category,
    tags: post.tags.map(pt => pt.tags),
    status: post.status,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    views: post.views || 0,
    commentsCount: post.comments_count || 0,
    readingTime: post.reading_time || 0,
    metaTitle: post.meta_title,
    metaDescription: post.meta_description
  }));
};

// Fetch a single post by slug
export const fetchPostBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image_url,
      author: authors (id, name, bio, avatar),
      category: categories (id, name, slug, description, color),
      tags: post_tags (tags (id, name, slug)),
      status,
      published_at,
      updated_at,
      views,
      comments_count,
      reading_time,
      meta_title,
      meta_description
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  // Transform the data to match our interface
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    featuredImageUrl: data.featured_image_url,
    author: data.author,
    category: data.category,
    tags: data.tags.map((pt: any) => pt.tags),
    status: data.status,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    views: data.views || 0,
    commentsCount: data.comments_count || 0,
    readingTime: data.reading_time || 0,
    metaTitle: data.meta_title,
    metaDescription: data.meta_description
  };
};

// Fetch posts by category
export const fetchPostsByCategory = async (categorySlug: string, limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image_url,
      author: authors (id, name, bio, avatar),
      category: categories (id, name, slug, description, color),
      tags: post_tags (tags (id, name, slug)),
      status,
      published_at,
      updated_at,
      views,
      comments_count,
      reading_time,
      meta_title,
      meta_description
    `)
    .eq('category.slug', categorySlug)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }

  // Transform the data to match our interface
  return data.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImageUrl: post.featured_image_url,
    author: post.author,
    category: post.category,
    tags: post.tags.map((pt: any) => pt.tags),
    status: post.status,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    views: post.views || 0,
    commentsCount: post.comments_count || 0,
    readingTime: post.reading_time || 0,
    metaTitle: post.meta_title,
    metaDescription: post.meta_description
  }));
};

// Fetch posts by tag
export const fetchPostsByTag = async (tagSlug: string, limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image_url,
      author: authors (id, name, bio, avatar),
      category: categories (id, name, slug, description, color),
      tags: post_tags (tags (id, name, slug)),
      status,
      published_at,
      updated_at,
      views,
      comments_count,
      reading_time,
      meta_title,
      meta_description
    `)
    .contains('tags', [{ slug: tagSlug }])
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }

  // Transform the data to match our interface
  return data.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImageUrl: post.featured_image_url,
    author: post.author,
    category: post.category,
    tags: post.tags.map((pt: any) => pt.tags),
    status: post.status,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    views: post.views || 0,
    commentsCount: post.comments_count || 0,
    readingTime: post.reading_time || 0,
    metaTitle: post.meta_title,
    metaDescription: post.meta_description
  }));
};

// Search posts
export const searchPosts = async (query: string, limit = 10) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      category: categories (name, slug),
      published_at
    `)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,tags.name.ilike.%${query}%`)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error searching posts:', error);
    return [];
  }

  return data as SearchResult[];
};

// Fetch all categories
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('posts_count', { ascending: false });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data as Category[];
};

// Fetch a single category by slug
export const fetchCategoryBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data as Category;
};

// Fetch all tags
export const fetchTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('posts_count', { ascending: false });

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  return data as Tag[];
};

// Fetch a single tag by slug
export const fetchTagBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching tag:', error);
    return null;
  }

  return data as Tag;
};

// Fetch comments for a post
export const fetchComments = async (postId: number) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .eq('status', 'approved')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  return data as Comment[];
};

// Submit a new comment
export const submitComment = async (commentData: {
  postId: number;
  authorName: string;
  authorEmail: string;
  content: string;
}) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([{
      post_id: commentData.postId,
      author_name: commentData.authorName,
      author_email: commentData.authorEmail,
      content: commentData.content,
      status: 'pending'
    }])
    .select()
    .single();

  if (error) {
    console.error('Error submitting comment:', error);
    return null;
  }

  return data as Comment;
};

// Increment post views
export const incrementPostViews = async (postId: number) => {
  const { error } = await supabase
    .from('posts')
    .update({ views: supabase.sql`views + 1` })
    .eq('id', postId);

  if (error) {
    console.error('Error incrementing post views:', error);
  }
};
