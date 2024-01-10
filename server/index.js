// server/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

app.get('/api/places', (req, res) => {
    // Implement API to retrieve places data
    res.json(/* Your places data */);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
