const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ success: false, error: "URL parameter is required" });
    }

    try {
        const apiUrl = `https://publisher.linkvertise.com/api/v1/redirect/link/check?url=${encodeURIComponent(url)}`;
        console.log("[PROXY] Calling Linkvertise API:", apiUrl);

        const response = await axios.get(apiUrl);
        console.log("[PROXY] Linkvertise API Response:", response.data);

        res.json(response.data);
    } catch (error) {
        console.error("[PROXY] Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: "Failed to validate hash" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
