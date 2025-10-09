import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/websearch", async (req, res) => {
  const { terms } = req.body;
  if (!terms || !Array.isArray(terms) || terms.length === 0) {
    return res.status(400).json({ error: "No search terms provided" });
  }

  const API_KEY = process.env.GOOGLE_API_KEY;
  const CSE_ID = process.env.GOOGLE_CSE_ID;

  try {
    const results: any[] = [];

    // Fetch top 3 results per term
    for (const term of terms) {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(term)}`
      );
    //   const data = await response.json();
    interface GoogleSearchResponse {
    items?: {
        title: string;
        link: string;
        snippet?: string;
    }[];
    }

    const data = (await response.json()) as GoogleSearchResponse;


      if (data.items) {
        results.push(...data.items.slice(0, 3));
      }
    }

    res.json({ results });
  } catch (err) {
    console.error("Web search failed:", err);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

export default router;