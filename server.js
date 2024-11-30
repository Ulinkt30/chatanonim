const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk mendapatkan pesan
app.get('/messages', (req, res) => {
    fs.readFile('./data/messages.json', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read messages' });
        res.json(JSON.parse(data));
    });
});

// Endpoint untuk menambahkan pesan
app.post('/messages', (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    fs.readFile('./data/messages.json', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read messages' });
        const messages = JSON.parse(data);
        messages.push({ message, timestamp: new Date() });

        fs.writeFile('./data/messages.json', JSON.stringify(messages, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to save message' });
            res.status(201).json({ success: true });
        });
    });
});

// Jalankan server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
