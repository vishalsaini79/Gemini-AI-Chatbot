export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Only POST allowed" } });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: { message: "API key missing" },
      });
    }

    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        error: { message: data?.error?.message || "Gemini error" },
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: { message: err.message },
    });
  }
}
