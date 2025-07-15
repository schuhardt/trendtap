
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { trend } = req.body;
  const prompt = `Summarize and rewrite this as a short blog post: ${trend.title}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });
    const json = await response.json();
    const summary = json.choices?.[0]?.message?.content || 'No summary generated.';
    res.status(200).json({ summary });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
