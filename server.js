import express from "express";
import cors from "cors";
import * as translateModule from "google-translate-api-browser";
const translate = translateModule.default || translateModule;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text, to } = req.body;

  if (!text || !to) return res.status(400).json({ error: "Missing 'text' or 'to'" });

  try {
    const result = await translate(text, { to });
    res.json({ text: result.text, from: result.from.language.iso });
  } catch (err) {
    res.status(500).json({ error: "Translate failed", details: err.message });
  }
});

app.get("/", (req, res) => res.send("Translate server running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
