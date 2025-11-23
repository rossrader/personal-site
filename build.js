const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { marked } = require('marked');
const matter = require('gray-matter');
const { postToBluesky, previewPost } = require('./bluesky');

// Directories
const CONTENT_DIR = path.join(__dirname, 'content', 'posts');
const POSTS_DIR = path.join(__dirname, 'posts');
const TEMPLATE_PATH = path.join(__dirname, 'post-template.html');
const TRACKING_FILE = path.join(__dirname, 'posts-published.json');

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
    ? post.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n                ')
    : '';

  return `          <a href="posts/${post.slug}.html" class="blog-post-preview-link">
            <article class="blog-post-preview">
              <h2>${post.title}</h2>
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
            </article>
          </a>`;
}

// Update index.html with posts
function updateIndexPage(posts) {
  const indexPath = path.join(__dirname, 'index.html');
  let indexHTML = fs.readFileSync(indexPath, 'utf-8');

  // Take only the 2 most recent posts for home page
  const recentPosts = posts.slice(0, 2);
  const previewCards = recentPosts.map(post => generatePreviewCard(post)).join('\n\n');

  // Find and replace the blog list section using markers
  const startMarker = '<div class="blog-list">';
  const endMarker = '</div>';

  const startIndex = indexHTML.indexOf(startMarker);
  if (startIndex === -1) {
    console.error('Could not find blog-list div in index.html');
    return;
  }

  // Find the matching closing div by counting div depth
  let depth = 0;
  let endIndex = -1;
  let searchStart = startIndex + startMarker.length;

  for (let i = searchStart; i < indexHTML.length; i++) {
    if (indexHTML.substr(i, 5) === '<div ' || indexHTML.substr(i, 4) === '<div>') {
      depth++;
    } else if (indexHTML.substr(i, 6) === '</div>') {
      if (depth === 0) {
        endIndex = i + 6;
        break;
      }
      depth--;
    }
  }

  if (endIndex === -1) {
    console.error('Could not find closing div for blog-list');
    return;
  }

  indexHTML = indexHTML.substring(0, startIndex) +
              `<div class="blog-list">\n${previewCards}\n        </div>` +
              indexHTML.substring(endIndex);

  fs.writeFileSync(indexPath, indexHTML, 'utf-8');
  console.log('✓ Updated index.html');
}

// Update blog.html with all posts
function updateBlogPage(posts) {
  const blogPath = path.join(__dirname, 'blog.html');
  let blogHTML = fs.readFileSync(blogPath, 'utf-8');

  // Generate preview cards for all posts
  const previewCards = posts.map(post => generatePreviewCard(post)).join('\n\n');

  // Find and replace the blog list section using markers
  const startMarker = '<div class="blog-list">';
  const endMarker = '</div>';

  const startIndex = blogHTML.indexOf(startMarker);
  if (startIndex === -1) {
    console.error('Could not find blog-list div in blog.html');
    return;
  }

  // Find the matching closing div by counting div depth
  let depth = 0;
  let endIndex = -1;
  let searchStart = startIndex + startMarker.length;

  for (let i = searchStart; i < blogHTML.length; i++) {
    if (blogHTML.substr(i, 5) === '<div ' || blogHTML.substr(i, 4) === '<div>') {
      depth++;
    } else if (blogHTML.substr(i, 6) === '</div>') {
      if (depth === 0) {
        endIndex = i + 6;
        break;
      }
      depth--;
    }
  }

  if (endIndex === -1) {
    console.error('Could not find closing div for blog-list');
    return;
  }

  blogHTML = blogHTML.substring(0, startIndex) +
             `<div class="blog-list">\n${previewCards}\n        </div>` +
             blogHTML.substring(endIndex);

  fs.writeFileSync(blogPath, blogHTML, 'utf-8');
  console.log('✓ Updated blog.html');
}

// Load published posts tracking
function loadPublishedPosts() {
  if (!fs.existsSync(TRACKING_FILE)) {
    return {};
  }
  const data = fs.readFileSync(TRACKING_FILE, 'utf-8');
  return JSON.parse(data);
}

// Save published posts tracking
function savePublishedPosts(tracking) {
  fs.writeFileSync(TRACKING_FILE, JSON.stringify(tracking, null, 2), 'utf-8');
}

// Get new posts that haven't been shared to Bluesky
function getNewPosts(posts) {
  const published = loadPublishedPosts();
  return posts.filter(post => !published[post.slug]);
}

// Prompt user for confirmation
function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().trim());
    });
  });
}

// Handle Bluesky posting for new posts
async function handleBlueskyPosting(newPosts) {
  if (newPosts.length === 0) {
    return;
  }

  console.log('\n📢 New post(s) detected!');
  console.log('─'.repeat(50));

  newPosts.forEach((post, index) => {
    console.log(`\n${index + 1}. ${post.title}`);
    const preview = previewPost(post);
    console.log(`   Preview (${preview.length} chars):`);
    console.log(`   "${preview.message}"`);
  });

  console.log('\n' + '─'.repeat(50));

  const answer = await promptUser('\nWould you like to post these to Bluesky? (y/n): ');

  if (answer === 'y' || answer === 'yes') {
    console.log('\n📤 Posting to Bluesky...\n');

    const published = loadPublishedPosts();

    for (const post of newPosts) {
      try {
        const result = await postToBluesky(post);

        if (result.success) {
          console.log(`✓ Posted: ${post.title}`);
          console.log(`  ${result.url}\n`);

          // Track this post
          published[post.slug] = {
            postedAt: new Date().toISOString(),
            blueskyUrl: result.url,
            title: post.title
          };
        } else {
          console.error(`✗ Failed to post "${post.title}": ${result.error}\n`);
        }
      } catch (error) {
        console.error(`✗ Error posting "${post.title}": ${error.message}\n`);
      }
    }

    savePublishedPosts(published);
    console.log('✅ Bluesky posting complete!');
  } else {
    console.log('\nℹ️  Skipped Bluesky posting. You can post later by running the build again.');
  }
}

// Main build function
async function build() {
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

  // Check for new posts and prompt for Bluesky posting
  const newPosts = getNewPosts(posts);
  await handleBlueskyPosting(newPosts);
}

// Run build
build().catch(error => {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
});
