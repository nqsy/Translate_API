const express = require("express");
import cors from "cors";
import { translate } from "google-translate-api-browser";

const app = express();

// CORS cấu hình đầy đủ
app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
}));

// Bắt tất cả OPTIONS request
app.options("*", cors());

app.use(express.json());

// Translate API
app.post("/translate", async (req, res) => {
    try {
        const { text, to } = req.body;

        if (!text || !to) {
            return res.status(400).json({ error: "Missing text or target language." });
        }

        const result = await translate(text, { to });

        res.json({
            success: true,
            translatedText: result.text
        });

    } catch (error) {
        console.error("Translate Error:", error);
        res.status(500).json({ error: "Translation failed." });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

