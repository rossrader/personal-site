# Ross Rader's Personal Blog

A minimal, static blog with glassmorphism design and a simple Markdown-to-HTML build system.

## Quick Start

### First Time Setup

1. Install dependencies:
   ```bash
   npm install
   ```

### Writing a New Post

1. Create a new Markdown file in `content/posts/`:
   ```bash
   touch content/posts/my-new-post.md
   ```

2. Add frontmatter and content:
   ```markdown
   ---
   title: "Your Post Title"
   date: "January 22, 2025"
   tags: ["AI", "Internet Services"]
   excerpt: "A brief description of your post for the blog list page."
   readingTime: "5 min read"
   ---

   Your content here using **Markdown** syntax!
   ```

3. Build the site:
   ```bash
   npm run build
   ```

4. Open `posts/my-new-post.html` in your browser to preview

## Bluesky Integration

This blog includes automatic posting to Bluesky Social when you publish new posts.

### Setup Bluesky

1. Generate an app password at: https://bsky.app/settings/app-passwords

2. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Add your credentials to `.env`:
   ```env
   BLUESKY_HANDLE=yourhandle.bsky.social
   BLUESKY_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
   SITE_URL=https://rossrader.ca
   ```

### How It Works

When you run `npm run build`:

1. The build script generates HTML from your Markdown posts
2. It checks for new posts that haven't been shared to Bluesky yet
3. If new posts are found, you'll see a preview of what will be posted
4. You can choose to post to Bluesky or skip

The post format is:
```
I just posted something new to my blog. [excerpt], read more about it at [link]
```

Posts are automatically tracked in `posts-published.json` so they won't be posted twice.

### Important Notes

- Bluesky posts are limited to 300 characters (excerpts will be truncated if needed)
- App passwords are more secure than using your main password
- The `.env` file is excluded from git to keep credentials private
- You can skip posting and do it later by running build again

## Project Structure

```
Blog/
├── content/
│   └── posts/           # Write your Markdown posts here
│       └── *.md
├── posts/               # Generated HTML posts (auto-created)
│   └── *.html
├── index.html           # Home page (auto-updated with recent posts)
├── blog.html            # Blog list page (auto-updated with all posts)
├── styles.css           # Global styles
├── build.js             # Build script
├── post-template.html   # Template for generated posts
└── package.json
```

## Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | Yes | Post title | `"AI and the Future of Internet Services"` |
| `date` | Yes | Publication date | `"January 15, 2025"` |
| `tags` | No | Array of topic tags | `["AI", "Technology"]` |
| `excerpt` | No | Brief description for list pages | `"A short summary..."` |
| `readingTime` | No | Estimated reading time | `"5 min read"` |

## Markdown Syntax

The build system supports full Markdown syntax:

- **Headings**: `# H1`, `## H2`, `### H3`, etc.
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Lists**:
  ```markdown
  - Unordered item
  - Another item

  1. Ordered item
  2. Another item
  ```
- **Links**: `[text](url)`
- **Code**:
  - Inline: `` `code` ``
  - Block: ` ```language\ncode\n``` `
- **Blockquotes**: `> Quote text`

## Build Process

The `npm run build` command:

1. Reads all `.md` files from `content/posts/`
2. Parses frontmatter and converts Markdown to HTML
3. Generates HTML files in `posts/` using `post-template.html`
4. Updates `index.html` with the 2 most recent posts
5. Updates `blog.html` with all posts, sorted by date

## Design

- **Modern glassmorphism** with frosted glass effects
- **Dark theme** with subtle blue/purple gradients
- **Custom fonts**: Plus Jakarta Sans (headings) + Inter (body)
- **Responsive** design for mobile and desktop
- **Accessibility** support with reduced motion preferences

## Tech Stack

- **Plain HTML/CSS** - No framework overhead
- **Node.js build script** - Simple Markdown → HTML conversion
- **Bluesky integration** - Automatic social media posting
- **Dependencies**:
  - `marked` - Markdown parser
  - `gray-matter` - Frontmatter parser
  - `@atproto/api` - Bluesky/AT Protocol client
  - `dotenv` - Environment variable management

## Tips

- Keep post filenames lowercase with hyphens: `my-post-title.md`
- The filename becomes the URL slug: `posts/my-post-title.html`
- Run `npm run build` after editing existing posts to regenerate HTML
- Preview posts locally by opening HTML files in your browser
- The build script won't overwrite manually edited files in `posts/`

## Customization

- Edit `post-template.html` to change the post layout
- Modify `styles.css` to adjust colors, fonts, or effects
- Update `build.js` if you need different frontmatter fields or processing logic

## Publishing

Since this is a static site, you can host it anywhere:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Just commit your changes and push to your repository.
