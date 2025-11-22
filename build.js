const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

// Directories
const CONTENT_DIR = path.join(__dirname, 'content', 'posts');
const POSTS_DIR = path.join(__dirname, 'posts');
const TEMPLATE_PATH = path.join(__dirname, 'post-template.html');

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

// Read all markdown files (excluding templates that start with _)
function getMarkdownFiles() {
  const files = fs.readdirSync(CONTENT_DIR)
    .filter(file => file.endsWith('.md') && !file.startsWith('_'))
    .map(file => path.join(CONTENT_DIR, file));
  return files;
}

// Parse markdown file
function parseMarkdownFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Convert markdown to HTML
  const htmlContent = marked(content);

  // Get filename without extension for URL
  const filename = path.basename(filePath, '.md');

  return {
    ...data,
    content: htmlContent,
    filename,
    slug: filename
  };
}

// Generate HTML from template
function generatePostHTML(post) {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // Format tags
  const tagsHTML = post.tags
    ? post.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n            ')
    : '';

  // Replace placeholders
  let html = template
    .replace(/\{\{TITLE\}\}/g, post.title)
    .replace(/\{\{DATE\}\}/g, post.date)
    .replace(/\{\{READING_TIME\}\}/g, post.readingTime || '5 min read')
    .replace(/\{\{TAGS\}\}/g, tagsHTML)
    .replace(/\{\{CONTENT\}\}/g, post.content);

  return html;
}

// Generate blog preview card HTML
function generatePreviewCard(post) {
  const tagsHTML = post.tags
    ? post.tags.map(tag => `<a href="#" class="tag">${tag}</a>`).join('\n              ')
    : '';

  return `          <article class="blog-post-preview">
            <h2><a href="posts/${post.slug}.html">${post.title}</a></h2>
            <div class="post-meta">
              <span>📅 ${post.date}</span>
              <span>⏱️ ${post.readingTime || '5 min read'}</span>
            </div>
            <p class="post-excerpt">
              ${post.excerpt || ''}
            </p>
            <div class="tags">
              ${tagsHTML}
            </div>
          </article>`;
}

// Update index.html with posts
function updateIndexPage(posts) {
  const indexPath = path.join(__dirname, 'index.html');
  let indexHTML = fs.readFileSync(indexPath, 'utf-8');

  // Take only the 2 most recent posts for home page
  const recentPosts = posts.slice(0, 2);
  const previewCards = recentPosts.map(post => generatePreviewCard(post)).join('\n\n');

  // Find and replace the blog list section
  const blogListRegex = /<div class="blog-list">([\s\S]*?)<\/div>/;
  indexHTML = indexHTML.replace(blogListRegex, `<div class="blog-list">\n${previewCards}\n        </div>`);

  fs.writeFileSync(indexPath, indexHTML, 'utf-8');
  console.log('✓ Updated index.html');
}

// Update blog.html with all posts
function updateBlogPage(posts) {
  const blogPath = path.join(__dirname, 'blog.html');
  let blogHTML = fs.readFileSync(blogPath, 'utf-8');

  // Generate preview cards for all posts
  const previewCards = posts.map(post => generatePreviewCard(post)).join('\n\n');

  // Find and replace the blog list section
  const blogListRegex = /<div class="blog-list">([\s\S]*?)<\/div>/;
  blogHTML = blogHTML.replace(blogListRegex, `<div class="blog-list">\n${previewCards}\n        </div>`);

  fs.writeFileSync(blogPath, blogHTML, 'utf-8');
  console.log('✓ Updated blog.html');
}

// Main build function
function build() {
  console.log('🔨 Building blog...\n');

  // Get all markdown files
  const markdownFiles = getMarkdownFiles();

  if (markdownFiles.length === 0) {
    console.log('⚠️  No markdown files found in content/posts/');
    return;
  }

  // Parse and process each file
  const posts = markdownFiles.map(file => {
    const post = parseMarkdownFile(file);
    const html = generatePostHTML(post);

    // Write HTML file
    const outputPath = path.join(POSTS_DIR, `${post.slug}.html`);
    fs.writeFileSync(outputPath, html, 'utf-8');

    console.log(`✓ Generated ${post.slug}.html`);

    return post;
  });

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Update index and blog pages
  console.log('');
  updateIndexPage(posts);
  updateBlogPage(posts);

  console.log(`\n✅ Build complete! Generated ${posts.length} post(s).`);
}

// Run build
try {
  build();
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
