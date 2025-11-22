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
- **Minimal dependencies**:
  - `marked` - Markdown parser
  - `gray-matter` - Frontmatter parser

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
