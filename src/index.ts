import express from "express";
import { Decoder } from './decoder'

const PORT = 3030;
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello world"
    })
});

app.get('/:linhaDigitavel', (req, res) => {
    res.json(Decoder.prototype.decodeTitulo(req.params.linhaDigitavel));
});

app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
});