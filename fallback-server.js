const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

const validHashes = new Set([
    "XbObop6kkLIIYj01lgQDoEwylUH4TPPOdEDJzk7r4SlRLuHZZjkv9bvh6TT3ajmC",
    "FmClQKTidWD03jHvnFVaa5Xr0QiSXnkCupCOBCcVAhd4h9ZzdLT0cCVMhEVxEamA",
    // Add more valid hashes here
]);

app.get('/validate', (req, res) => {
    const hash = req.query.hash;
    if (!hash) {
        return res.status(400).json({ success: false, error: "Hash parameter is required" });
    }

    if (validHashes.has(hash)) {
        res.json({ success: true });
    } else {
        res.json({ success: false, error: "Invalid or expired hash" });
    }
});

app.listen(PORT, () => {
    console.log(`Fallback server running on http://localhost:${PORT}`);
});
