// import { fetchPosts, fetchCategories, fetchTags } from './api';

// Base URL for the site
const BASE_URL = 'https://asa-blog.com';

// Function to generate sitemap.xml
export const generateSitemap = async () => {
  try {
    // Fetch posts, categories, and tags
    // const posts = await fetchPosts(1000); // Fetch up to 1000 posts
    // const categories = await fetchCategories();
    // const tags = await fetchTags();

    // Start building the sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add homepage
    sitemap += `
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Add categories page
    sitemap += `
  <url>
    <loc>${BASE_URL}/blog/categories</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Add tags page
    sitemap += `
  <url>
    <loc>${BASE_URL}/blog/tags</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Add about page
    sitemap += `
  <url>
    <loc>${BASE_URL}/blog/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Add category pages
    // categories.forEach(category => {
    //   sitemap += `
    // <url>
    //   <loc>${BASE_URL}/blog/category/${category.slug}</loc>
    //   <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    //   <changefreq>weekly</changefreq>
    //   <priority>0.7</priority>
    // </url>`;
    // });

    // Add tag pages
    // tags.forEach(tag => {
    //   sitemap += `
    // <url>
    //   <loc>${BASE_URL}/blog/tag/${tag.slug}</loc>
    //   <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    //   <changefreq>weekly</changefreq>
    //   <priority>0.7</priority>
    // </url>`;
    // });

    // Add post pages
    // posts.forEach(post => {
    //   const priority = post.featuredPost ? '0.9' : '0.8';
    //   const changefreq = post.publishedAt && new Date(post.publishedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
    //     ? 'daily' 
    //     : 'monthly';

    //   sitemap += `
    // <url>
    //   <loc>${BASE_URL}/blog/post/${post.slug}</loc>
    //   <lastmod>${new Date(post.updatedAt || post.publishedAt).toISOString().split('T')[0]}</lastmod>
    //   <changefreq>${changefreq}</changefreq>
    //   <priority>${priority}</priority>
    // </url>`;
    // });

    // Close the sitemap
    sitemap += `
</urlset>`;

    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return null;
  }
};

// Function to generate robots.txt
export const generateRobotsTxt = () => {
  return `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Disallow admin areas
Disallow: /admin/`;
};
