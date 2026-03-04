const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

// Отдаем фронтенд
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Отдаем данные
app.get('/api/data', (req, res) => {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
});

// Сохраняем правки (Пароль тут!)
app.post('/api/save', (req, res) => {
    const { password, newData } = req.body;
    
    if (password !== '09210921') {
        return res.status(403).json({ success: false, error: 'Wrong password' });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
    res.json({ success: true });
});

module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Altar server running on ${PORT}`));