const express = require('express');
const http = require('http');
const Dalai = require('dalai'); 

const app = express();
const PORT = process.env.PORT || 8888;
const dalai = new Dalai("/home/dan/dalai/")

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
      const chatsays = chunks.join(''); 
      
      res.json({ chatsays });
    })


});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
