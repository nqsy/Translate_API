const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  res.send('Hello, this is a simple text!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
