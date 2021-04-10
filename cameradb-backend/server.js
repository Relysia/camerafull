const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

app.use(cors());
app.use(express.json());

// Lowdb setup
const adapter = new FileSync('data.json');
const data = low(adapter);

data.defaults({ cameras: [] }).write();

app.get('/', (req, res) => {
  res.send('CameraDB Api');
});

app.get('/api/cameras', (req, res) => {
  const cameras = data.get('cameras').value();
  res.json(cameras);
});

app.listen(port, () => {
  console.log(`CameraDB Api listening at http://localhost:${port}`);
});
