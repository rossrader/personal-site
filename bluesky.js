const { BskyAgent, RichText } = require('@atproto/api');
require('dotenv').config();

const BLUESKY_SERVICE = 'https://bsky.social';
const MAX_POST_LENGTH = 300;

/**
 * Create and authenticate a Bluesky agent
 */
async function createAgent() {
  const handle = process.env.BLUESKY_HANDLE;
  const password = process.env.BLUESKY_APP_PASSWORD;

  if (!handle || !password) {
    throw new Error('Missing Bluesky credentials. Please set BLUESKY_HANDLE and BLUESKY_APP_PASSWORD in .env file');
  }

  const agent = new BskyAgent({ service: BLUESKY_SERVICE });

  try {
    await agent.login({
      identifier: handle,
      password: password
    });
    return agent;
  } catch (error) {
    throw new Error(`Failed to login to Bluesky: ${error.message}`);
  }
}

/**
 * Truncate text to fit within character limit while preserving whole words
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }

  return truncated + '...';
}

/**
 * Create a post message with excerpt and link
 */
function createPostMessage(post, siteUrl) {
  const postUrl = `${siteUrl}/posts/${post.slug}.html`;

  // Base message structure
  const prefix = "I just posted something new to my blog. ";
  const suffix = `, read more about it at ${postUrl}`;

  // Calculate available space for excerpt
  const availableSpace = MAX_POST_LENGTH - prefix.length - suffix.length;

  // Truncate excerpt if needed
  const excerpt = truncateText(post.excerpt || post.title, availableSpace);

  return prefix + excerpt + suffix;
}

/**
 * Post to Bluesky
 */
async function postToBluesky(post) {
  const siteUrl = process.env.SITE_URL || 'https://rossrader.ca';

  try {
    const agent = await createAgent();
    const message = createPostMessage(post, siteUrl);

    // Use RichText to properly format links
    const rt = new RichText({ text: message });
    await rt.detectFacets(agent);

    const response = await agent.post({
      text: rt.text,
      facets: rt.facets,
      createdAt: new Date().toISOString()
    });

    // Construct Bluesky post URL from response
    const handle = process.env.BLUESKY_HANDLE.replace('.bsky.social', '');
    const postId = response.uri.split('/').pop();
    const blueskyUrl = `https://bsky.app/profile/${handle}.bsky.social/post/${postId}`;

    return {
      success: true,
      url: blueskyUrl,
      uri: response.uri
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Preview what the post will look like
 */
function previewPost(post) {
  const siteUrl = process.env.SITE_URL || 'https://rossrader.ca';
  const message = createPostMessage(post, siteUrl);

  return {
    message,
    length: message.length,
    withinLimit: message.length <= MAX_POST_LENGTH
  };
}

module.exports = {
  postToBluesky,
  previewPost
};
