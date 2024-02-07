const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.post('/api/gpt', async (req, res) => {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
    prompt: req.body.prompt,
    max_tokens: 150
}, {
    headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
});
res.json(response.data);
});


app.post('/api/message', (req, res) => {
    const { message } = req.body;
    // Process the message...
    res.json({ reply: `Server received: ${message}` });
  });


  