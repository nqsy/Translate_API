const express = require("express");
const cors = require("cors");
const { translate } = require("google-translate-api-browser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text, to } = req.body;

  if (!text || !to) {
    return res.status(400).json({ error: "Missing 'text' or 'to'" });
  }

  const targets = Array.isArray(to) ? to : [to];

  try {
    const translations = await Promise.all(
      targets.map(lang =>
        translate(text, { to: lang })
          .then(result => ({
            to: lang,
            text: result.text,
            detected: result.from.language.iso
          }))
      )
    );

    res.json({
      original: text,
      translations
    });
  } catch (err) {
    res.status(500).json({ error: "Translate failed", details: err.message });
  }
});

app.get("/", (req, res) => res.send("Translate server running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
