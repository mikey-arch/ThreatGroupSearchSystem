import express from "express";
import fetch from "node-fetch";

const router = express.Router();

interface SerpAPIResponse {
  organic_results?: {
    title: string;
    link: string;
    snippet?: string;
  }[];
  error?: string;
}

router.get("/", async (req, res) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "No search query provided" });
  }

  const API_KEY = process.env.SERPAPI_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "SerpAPI key not configured" });
  }

  try {
    const enhancedQuery = `${query} APT threat group cyber`;
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(enhancedQuery)}&api_key=${API_KEY}&num=10`;
    console.log("Fetching SerpAPI:", url.replace(API_KEY, "***API_KEY***"));

    const response = await fetch(url);
    const data = (await response.json()) as SerpAPIResponse;

    console.log("SerpAPI Response Status:", response.status);

    if (!response.ok || data.error) {
      console.error("SerpAPI Error:", data.error || data);
      return res.status(500).json({ error: data.error || "SerpAPI error" });
    }

    // Convert SerpAPI format to frontend format
    const items = data.organic_results?.map(result => ({
      title: result.title,
      link: result.link,
      snippet: result.snippet
    })) || [];

    res.json({ items });
  } catch (err) {
    console.error("Web search failed:", err);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

export default router;
