const express = require('express');
const http = require('http');
const Dalai = require('dalai'); 

const app = express();
const PORT = process.env.PORT || 8888;
const dalai = new Dalai("<path/to/dalai/>")

app.use(express.static('public'));
app.use(express.json());

const server = http.createServer(app);

app.post('/dalai_request', (req, res) => {
  
  const input = req.body.input;
  const chunks = [];

  console.log(input);
  dalai.request({
    model: "alpaca.7B",
    prompt: input,
  }, (token) => {
    console.log(token);
    chunks.push(token);
  })
  .then(() => {
    const response = chunks.join('');
    const responseMarker = '### Response:';
    const startIndex = response.indexOf(responseMarker);
    let truncatedResponse = '';

    if (startIndex !== -1) {
      truncatedResponse = response.slice(startIndex + responseMarker.length).trim();
    } else {
      truncatedResponse = response;
    }

    res.json({ chatsays: truncatedResponse });
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
