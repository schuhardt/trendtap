
export async function fetchRedditTrends() {
  const res = await fetch("https://www.reddit.com/r/technology/hot.json?limit=5");
  const data = await res.json();
  return data.data.children.map(post => ({
    title: post.data.title,
    source: "Reddit",
    category: "Tech",
    url: `https://reddit.com${post.data.permalink}`
  }));
}
