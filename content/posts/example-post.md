---
title: "Example Post: Writing in Markdown"
date: "January 22, 2025"
tags: ["Tutorial", "Markdown"]
excerpt: "This is an example post showing you how to write content in Markdown format. It's much easier than writing HTML directly!"
readingTime: "3 min read"
---

Welcome to your new blog workflow! This example post shows you how to write content in Markdown, which is much simpler than writing HTML.

## Why Markdown?

Markdown gives you:
- **Clean, readable source files** - No HTML tags cluttering your content
- **Fast writing** - Focus on content, not formatting
- **Automatic styling** - Your build script handles all the HTML and CSS

## How to Write a Post

1. Create a new `.md` file in `content/posts/`
2. Add frontmatter at the top (between the `---` lines)
3. Write your content using Markdown
4. Run `npm run build`
5. Your HTML file appears in the `posts/` folder!

## Markdown Syntax Examples

### Headings

Use `#` for headings. More `#` symbols = smaller headings.

### Lists

Unordered lists use `-` or `*`:
- Item one
- Item two
- Item three

Ordered lists use numbers:
1. First step
2. Second step
3. Third step

### Emphasis

- *Italic text* with single asterisks
- **Bold text** with double asterisks
- ***Bold and italic*** with triple asterisks

### Links

Create links like this: [Link text](https://example.com)

### Code

Inline code uses `backticks` around the text.

Code blocks use triple backticks:

```javascript
function hello() {
  console.log("Hello, world!");
}
```

### Blockquotes

> This is a blockquote. Use the `>` character at the start of the line.
> You can have multiple lines.

## Frontmatter Fields

The frontmatter at the top of your `.md` file tells the build script important information:

- **title**: Your post title (required)
- **date**: Publication date (required) - Use format like "January 22, 2025"
- **tags**: Array of topic tags (optional)
- **excerpt**: Short description for blog list pages (optional)
- **readingTime**: Estimated reading time (optional) - e.g., "5 min read"

## That's It!

Writing in Markdown is that simple. Focus on your content, and let the build script handle the rest.

Happy writing!
