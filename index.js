const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('API KIP-K Tracker Kelompok SUGES Berhasil Jalan!');
});

app.listen(PORT, () => {
    console.log(`Server nyala di http://localhost:${PORT}`);
});