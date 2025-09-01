// Mock data store for posts - In real app, this would be Supabase

// Categories data
let mockCategories = [
  {
    id: 1,
    name: "Match Reports",
    slug: "match-reports",
    description: "Detailed coverage of ASA matches, including analysis and highlights",
    postsCount: 24,
    color: "#dc2626",
    isActive: true,
    createdAt: "2023-08-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Transfers",
    slug: "transfers",
    description: "Latest news on player transfers, signings, and contract updates",
    postsCount: 18,
    color: "#2563eb",
    isActive: true,
    createdAt: "2023-08-20T10:00:00Z",
    updatedAt: "2024-01-14T10:00:00Z"
  },
  {
    id: 3,
    name: "Training",
    slug: "training",
    description: "Behind-the-scenes look at training sessions and preparation",
    postsCount: 15,
    color: "#16a34a",
    isActive: true,
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2024-01-12T10:00:00Z"
  },
  {
    id: 4,
    name: "Programming",
    slug: "programming",
    description: "Programming tutorials and guides",
    postsCount: 8,
    color: "#7c3aed",
    isActive: true,
    createdAt: "2023-09-05T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z"
  },
  {
    id: 5,
    name: "Development",
    slug: "development",
    description: "Web development and software engineering",
    postsCount: 12,
    color: "#ea580c",
    isActive: true,
    createdAt: "2023-09-10T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z"
  },
  {
    id: 6,
    name: "Design",
    slug: "design",
    description: "UI/UX design and visual design principles",
    postsCount: 6,
    color: "#db2777",
    isActive: true,
    createdAt: "2023-09-15T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z"
  }
];

let mockPosts = [
  {
    id: 1,
    title: "ASA Wins Championship Final Against Wydad Casablanca",
    slug: "asa-wins-championship-final-wydad",
    excerpt: "In a thrilling match that went into extra time, ASA secured their first championship title in over a decade with a spectacular 3-2 victory.",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>In a thrilling match that will be remembered for years to come, ASA secured their first championship title in over a decade with a spectacular 3-2 victory against Wydad Casablanca at the Mohammed V Stadium.</p>
        
        <h2>Match Highlights</h2>
        <p>The match started with high intensity from both sides. ASA took an early lead in the 15th minute through a brilliant strike from Youssef Amrani, who curled the ball into the top corner from 25 yards out.</p>
        
        <p>Wydad responded quickly, equalizing just 10 minutes later through their captain Badr Benoun. The first half ended 1-1, setting up what would be an unforgettable second half.</p>
        
        <h2>Second Half Drama</h2>
        <p>The second half saw end-to-end action with both teams creating numerous chances. ASA regained the lead in the 65th minute when striker Ahmed Reda capitalized on a defensive error to slot home from close range.</p>
        
        <p>Just when it seemed ASA had secured the victory, Wydad struck back in the 88th minute through a controversial penalty, sending the match into extra time.</p>
        
        <h2>Extra Time Glory</h2>
        <p>In the 105th minute of extra time, substitute Mehdi Alaoui became the hero, scoring the winning goal with a spectacular overhead kick that sent the ASA fans into delirium.</p>
        
        <p>This victory marks ASA's return to the top of Moroccan football and validates the hard work put in by coach Rachid Taoussi and his squad throughout the season.</p>
        
        <h2>What This Means</h2>
        <p>This championship win is more than just a trophy – it represents the culmination of years of rebuilding and investment in youth development. The victory also secures ASA's place in next season's CAF Champions League.</p>
      </div>
    `,
    featuredImageUrl: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
    author: {
      name: "Ahmed Benali",
      bio: "Sports journalist covering ASA for over 10 years",
      avatar: null
    },
    category: {
      name: "Match Reports",
      slug: "match-reports"
    },
    tags: [
      { name: "Championship", slug: "championship" },
      { name: "Victory", slug: "victory" },
      { name: "Wydad", slug: "wydad" },
      { name: "Final", slug: "final" }
    ],
    status: "published",
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    views: 2847,
    commentsCount: 45,
    readingTime: 5,
    metaTitle: "ASA Wins Championship Final Against Wydad Casablanca - Historic Victory",
    metaDescription: "ASA secured their first championship title in over a decade with a spectacular 3-2 victory against Wydad Casablanca in extra time."
  },
  {
    id: 2,
    title: "New Signing: Youssef Amrani Joins ASA",
    slug: "new-signing-youssef-amrani",
    excerpt: "The talented midfielder from Raja Casablanca brings experience and skill to strengthen our midfield.",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>ASA is delighted to announce the signing of midfielder Youssef Amrani from Raja Casablanca on a three-year deal.</p>
        
        <h2>Player Profile</h2>
        <p>Amrani, 26, brings a wealth of experience having made over 100 appearances for Raja Casablanca and earned 15 caps for the Moroccan national team.</p>
        
        <p>Known for his technical ability, vision, and leadership qualities, Amrani will add significant depth to ASA's midfield options for the upcoming season.</p>
        
        <h2>Manager's Comments</h2>
        <p>"Youssef is exactly the type of player we've been looking for," said head coach Rachid Taoussi. "His experience at the highest level and his understanding of Moroccan football will be invaluable to our squad."</p>
        
        <p>"I'm excited to work with him and I'm confident he'll make an immediate impact on our team's performance."</p>
        
        <h2>Player's Statement</h2>
        <p>"I'm thrilled to join ASA," said Amrani. "This is a club with great ambition and I'm looking forward to contributing to the team's success."</p>
        
        <p>"The project here is very exciting and I can't wait to get started and meet my new teammates."</p>
      </div>
    `,
    featuredImageUrl: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg",
    author: {
      name: "Sara Alami",
      bio: "Transfer news specialist",
      avatar: null
    },
    category: {
      name: "Transfers",
      slug: "transfers"
    },
    tags: [
      { name: "Transfer", slug: "transfer" },
      { name: "New Player", slug: "new-player" },
      { name: "Midfielder", slug: "midfielder" }
    ],
    status: "published",
    publishedAt: "2024-01-14T15:30:00Z",
    updatedAt: "2024-01-14T15:30:00Z",
    views: 1249,
    commentsCount: 23,
    readingTime: 3,
    metaTitle: "New Signing: Youssef Amrani Joins ASA",
    metaDescription: "The talented midfielder from Raja Casablanca brings experience and skill to strengthen our midfield."
  }
];

// Admin posts for the admin panel
let adminPosts = [
  {
    id: 1,
    title: "ASA Wins Championship Final Against Wydad Casablanca",
    slug: "asa-wins-championship-final-wydad",
    author: "Ahmed Benali",
    status: "published",
    category: "Match Reports",
    tags: ["Championship", "Victory", "Wydad"],
    publishDate: "2024-01-15",
    views: 2847,
    comments: 45
  },
  {
    id: 2,
    title: "New Signing: Youssef Amrani Joins ASA",
    slug: "new-signing-youssef-amrani",
    author: "Sara Alami",
    status: "published",
    category: "Transfers",
    tags: ["Transfer", "New Player"],
    publishDate: "2024-01-14",
    views: 1249,
    comments: 23
  },
  {
    id: 3,
    title: "Advanced TypeScript Techniques",
    slug: "advanced-typescript-techniques",
    author: "Mike Chen",
    status: "draft",
    category: "Programming",
    tags: ["TypeScript", "JavaScript"],
    publishDate: null,
    views: 0,
    comments: 0
  },
  {
    id: 4,
    title: "Building Modern Web Apps",
    slug: "building-modern-web-apps",
    author: "Alex Kumar",
    status: "published", 
    category: "Development",
    tags: ["Web Development", "Modern", "Apps"],
    publishDate: "2024-01-14",
    views: 2847,
    comments: 45
  },
  {
    id: 5,
    title: "CSS Grid Layout Guide",
    slug: "css-grid-layout-guide",
    author: "Emma Wilson",
    status: "scheduled",
    category: "Design",
    tags: ["CSS", "Layout", "Grid"],
    publishDate: "2024-01-20",
    views: 0,
    comments: 0
  }
];

const statusColors = {
  published: "bg-success/10 text-success",
  draft: "bg-warning/10 text-warning",
  scheduled: "bg-accent/10 text-accent",
  archived: "bg-muted text-muted-foreground",
  rejected: "bg-destructive/10 text-destructive"
};

// Helper functions
export const getAllPosts = () => {
  return mockPosts.filter(post => post.status === 'published');
};

export const getPostBySlug = (slug: string) => {
  console.log('Looking for post with slug:', slug);
  console.log('Available mockPosts:', mockPosts.map(p => ({ slug: p.slug, status: p.status, title: p.title })));
  console.log('Available adminPosts:', adminPosts.map(p => ({ slug: p.slug, status: p.status, title: p.title })));
  
  // First check published posts in mockPosts
  let post = mockPosts.find(post => post.slug === slug && post.status === 'published');
  
  // If not found, check admin posts and create a blog-compatible version
  if (!post) {
    const adminPost = adminPosts.find(p => p.slug === slug);
    console.log('Found admin post:', adminPost);
    
    if (adminPost && adminPost.status === 'published') {
      // Create a blog-compatible post from admin post
      post = {
        id: adminPost.id,
        title: adminPost.title,
        slug: adminPost.slug,
        excerpt: `Brief excerpt for ${adminPost.title}`,
        content: `<h2>Welcome to ${adminPost.title}</h2><p>This is the main content of the post. The full content would be available here.</p>`,
        featuredImageUrl: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
        author: {
          name: adminPost.author,
          bio: "Blog author",
          avatar: null
        },
        category: {
          name: adminPost.category,
          slug: adminPost.category.toLowerCase().replace(/\s+/g, '-')
        },
        tags: adminPost.tags.map(tag => ({ name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') })),
        status: adminPost.status,
        publishedAt: adminPost.publishDate ? `${adminPost.publishDate}T10:00:00Z` : new Date().toISOString(),
        updatedAt: adminPost.publishDate ? `${adminPost.publishDate}T10:00:00Z` : new Date().toISOString(),
        views: adminPost.views,
        commentsCount: adminPost.comments,
        readingTime: 3,
        metaTitle: adminPost.title,
        metaDescription: `Learn about ${adminPost.title}`
      };
      
      // Also add this post to mockPosts for future requests
      mockPosts.unshift(post);
      console.log('Added post to mockPosts:', post);
    }
  }
  
  console.log('Returning post:', post);
  return post;
};

export const getPostsByCategory = (categorySlug: string) => {
  return mockPosts.filter(post => 
    post.status === 'published' && 
    post.category.slug === categorySlug
  );
};

export const getFeaturedPost = () => {
  return mockPosts.find(post => post.status === 'published') || mockPosts[0];
};

export const getRecentPosts = (limit: number = 4) => {
  return mockPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

// Get all unique tags from published posts
export const getAllTags = () => {
  const allTags = new Set<string>();
  
  mockPosts
    .filter(post => post.status === 'published')
    .forEach(post => {
      post.tags.forEach((tag: any) => {
        allTags.add(tag.name);
      });
    });
  
  return Array.from(allTags).map(tagName => ({
    id: tagName.toLowerCase().replace(/\s+/g, '-'),
    name: tagName,
    slug: tagName.toLowerCase().replace(/\s+/g, '-'),
    postsCount: mockPosts.filter(post => 
      post.status === 'published' && 
      post.tags.some((tag: any) => tag.name === tagName)
    ).length
  }));
};

// Get posts by tag
export const getPostsByTag = (tagSlug: string) => {
  return mockPosts.filter(post => 
    post.status === 'published' && 
    post.tags.some((tag: any) => tag.slug === tagSlug)
  );
};

// Debug function to see all posts
export const debugAllPosts = () => {
  console.log('=== DEBUG: All Posts ===');
  console.log('Admin Posts:', adminPosts);
  console.log('Mock Posts:', mockPosts);
  console.log('Published Mock Posts:', mockPosts.filter(p => p.status === 'published'));
  return {
    adminPosts,
    mockPosts,
    publishedMockPosts: mockPosts.filter(p => p.status === 'published')
  };
};

// Admin functions
export const getAdminPosts = () => {
  return adminPosts;
};

export const createPost = (postData: any) => {
  const newId = Math.max(...adminPosts.map(p => p.id), ...mockPosts.map(p => p.id)) + 1;
  
  console.log('Creating post with data:', postData);
  
  // Create admin post
  const adminPost = {
    id: newId,
    title: postData.title,
    slug: postData.slug,
    author: "Current User", // In real app, get from auth
    status: postData.status,
    category: postData.category,
    tags: postData.tags,
    publishDate: postData.status === 'published' ? new Date().toISOString().split('T')[0] : null,
    views: 0,
    comments: 0
  };
  
  adminPosts.push(adminPost);
  console.log('Added admin post:', adminPost);
  
  // If published, also add to public posts
  if (postData.status === 'published') {
          const publicPost = {
        id: newId,
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt || `Learn about ${postData.title} and discover valuable insights in this comprehensive article.`,
        content: postData.content || `
          <div class="prose prose-lg max-w-none">
            <h2>${postData.title}</h2>
            <p>Welcome to this comprehensive guide about ${postData.title.toLowerCase()}. In this article, we'll explore various aspects and provide valuable insights.</p>
            
            <h3>Introduction</h3>
            <p>${postData.title} is an important topic that deserves our attention. This article will provide you with detailed information and practical knowledge.</p>
            
            <h3>Key Points</h3>
            <ul>
              <li>Important aspect 1 of ${postData.title.toLowerCase()}</li>
              <li>Key consideration 2</li>
              <li>Essential information 3</li>
              <li>Valuable insight 4</li>
            </ul>
            
            <h3>Detailed Analysis</h3>
            <p>When it comes to ${postData.title.toLowerCase()}, there are several factors to consider. Understanding these elements is crucial for success.</p>
            
            <h3>Conclusion</h3>
            <p>This article has provided a comprehensive overview of ${postData.title.toLowerCase()}. We hope you found this information valuable and informative.</p>
          </div>
        `,
        featuredImageUrl: postData.featuredImage || "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
      author: {
        name: "Current User",
        bio: "Blog author",
        avatar: null
      },
      category: {
        name: postData.category?.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || "General",
        slug: postData.category || "general"
      },
      tags: postData.tags?.map((tag: string) => ({ name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') })) || [],
      status: "published",
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      commentsCount: 0,
      readingTime: Math.ceil((postData.content?.length || 1000) / 200),
      metaTitle: postData.metaTitle || postData.title,
      metaDescription: postData.metaDescription || postData.excerpt || `Learn about ${postData.title}`
    };
    
    mockPosts.unshift(publicPost); // Add to beginning for latest posts
    console.log('Added public post to mockPosts:', publicPost);
  }
  
  console.log('Final adminPosts count:', adminPosts.length);
  console.log('Final mockPosts count:', mockPosts.length);
  return adminPost;
};

export const updatePost = (id: number, postData: any) => {
  // Update admin post
  const adminIndex = adminPosts.findIndex(p => p.id === id);
  if (adminIndex !== -1) {
    adminPosts[adminIndex] = {
      ...adminPosts[adminIndex],
      title: postData.title,
      slug: postData.slug,
      status: postData.status,
      category: postData.category,
      tags: postData.tags,
      publishDate: postData.status === 'published' ? 
        (adminPosts[adminIndex].publishDate || new Date().toISOString().split('T')[0]) : 
        null
    };
  }
  
  // Update or create public post
  const publicIndex = mockPosts.findIndex(p => p.id === id);
  
  if (postData.status === 'published') {
    const publicPost = {
      id: id,
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt || `Brief excerpt for ${postData.title}`,
      content: postData.content || `<p>Content for ${postData.title}</p>`,
      featuredImageUrl: postData.featuredImage || "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
      author: {
        name: "Current User",
        bio: "Blog author",
        avatar: null
      },
      category: {
        name: postData.category?.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || "General",
        slug: postData.category || "general"
      },
      tags: postData.tags?.map((tag: string) => ({ name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') })) || [],
      status: "published",
      publishedAt: publicIndex !== -1 ? mockPosts[publicIndex].publishedAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: publicIndex !== -1 ? mockPosts[publicIndex].views : 0,
      commentsCount: publicIndex !== -1 ? mockPosts[publicIndex].commentsCount : 0,
      readingTime: Math.ceil((postData.content?.length || 1000) / 200),
      metaTitle: postData.metaTitle || postData.title,
      metaDescription: postData.metaDescription || postData.excerpt || `Learn about ${postData.title}`
    };
    
    if (publicIndex !== -1) {
      mockPosts[publicIndex] = publicPost;
    } else {
      mockPosts.unshift(publicPost);
    }
  } else {
    // If not published, remove from public posts
    if (publicIndex !== -1) {
      mockPosts.splice(publicIndex, 1);
    }
  }
  
  return adminPosts[adminIndex];
};

export const deletePost = (id: number) => {
  // Remove from admin posts
  const adminIndex = adminPosts.findIndex(p => p.id === id);
  if (adminIndex !== -1) {
    adminPosts.splice(adminIndex, 1);
  }
  
  // Remove from public posts
  const publicIndex = mockPosts.findIndex(p => p.id === id);
  if (publicIndex !== -1) {
    mockPosts.splice(publicIndex, 1);
  }
};

export const archivePost = (id: number) => {
  // Update admin post status
  const adminIndex = adminPosts.findIndex(p => p.id === id);
  if (adminIndex !== -1) {
    adminPosts[adminIndex].status = 'archived';
    adminPosts[adminIndex].publishDate = null;
  }
  
  // Remove from public posts
  const publicIndex = mockPosts.findIndex(p => p.id === id);
  if (publicIndex !== -1) {
    mockPosts.splice(publicIndex, 1);
  }
  
  return adminPosts[adminIndex];
};

export const duplicatePost = (id: number) => {
  const adminPost = adminPosts.find(p => p.id === id);
  if (!adminPost) return null;
  
  const newId = Math.max(...adminPosts.map(p => p.id), ...mockPosts.map(p => p.id)) + 1;
  const duplicatedPost = {
    ...adminPost,
    id: newId,
    title: `${adminPost.title} (Copy)`,
    slug: `${adminPost.slug}-copy`,
    status: 'draft',
    publishDate: null,
    views: 0,
    comments: 0
  };
  
  adminPosts.push(duplicatedPost);
  return duplicatedPost;
};

export const schedulePost = (id: number) => {
  const adminIndex = adminPosts.findIndex(p => p.id === id);
  if (adminIndex !== -1) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    adminPosts[adminIndex].status = 'scheduled';
    adminPosts[adminIndex].publishDate = tomorrow.toISOString().split('T')[0];
  }
  
  // Remove from public posts if it was published
  const publicIndex = mockPosts.findIndex(p => p.id === id);
  if (publicIndex !== -1) {
    mockPosts.splice(publicIndex, 1);
  }
  
  return adminPosts[adminIndex];
};

// Categories functions
export const getAllCategories = () => {
  return mockCategories;
};

export const getActiveCategories = () => {
  return mockCategories.filter(cat => cat.isActive);
};

export const getCategoryBySlug = (slug: string) => {
  return mockCategories.find(cat => cat.slug === slug);
};

export const createCategory = (categoryData: any) => {
  const newId = Math.max(...mockCategories.map(c => c.id)) + 1;
  const category = {
    id: newId,
    ...categoryData,
    postsCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockCategories.push(category);
  return category;
};

export const updateCategory = (id: number, categoryData: any) => {
  const index = mockCategories.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCategories[index] = {
      ...mockCategories[index],
      ...categoryData,
      updatedAt: new Date().toISOString()
    };
    return mockCategories[index];
  }
  return null;
};

export const deleteCategory = (id: number) => {
  const index = mockCategories.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCategories.splice(index, 1);
    return true;
  }
  return false;
};

export const duplicateCategory = (id: number) => {
  const category = mockCategories.find(c => c.id === id);
  if (!category) return null;
  
  const newId = Math.max(...mockCategories.map(c => c.id)) + 1;
  const duplicatedCategory = {
    ...category,
    id: newId,
    name: `${category.name} (Copy)`,
    slug: `${category.slug}-copy`,
    postsCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockCategories.push(duplicatedCategory);
  return duplicatedCategory;
};

export const toggleCategoryStatus = (id: number) => {
  const index = mockCategories.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCategories[index].isActive = !mockCategories[index].isActive;
    mockCategories[index].updatedAt = new Date().toISOString();
    return mockCategories[index];
  }
  return null;
};

export const bulkUpdateCategories = (ids: number[], action: 'activate' | 'deactivate' | 'delete') => {
  if (action === 'delete') {
    ids.forEach(id => deleteCategory(id));
  } else {
    const isActive = action === 'activate';
    ids.forEach(id => {
      const index = mockCategories.findIndex(c => c.id === id);
      if (index !== -1) {
        mockCategories[index].isActive = isActive;
        mockCategories[index].updatedAt = new Date().toISOString();
      }
    });
  }
};