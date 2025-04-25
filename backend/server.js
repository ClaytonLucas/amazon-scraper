import express from 'express';
import scrapeAmazon from './scrapper.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.status(400).json({ error: 'Keyword is required' });

  try {
    const data = await scrapeAmazon(keyword);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
