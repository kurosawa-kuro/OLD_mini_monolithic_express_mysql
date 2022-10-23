const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('top');
});

app.listen(3000, () => {
    console.log('ポート3000でリクエスト待受中...');
});