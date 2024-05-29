const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const port = 3000;

// Apply rate limiting to all requests
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 300, // limit each IP to 300 requests per windowMs
    message: "Too many requests from this IP, please try again after an hour"
});

app.use(limiter);

// Serve static files
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
