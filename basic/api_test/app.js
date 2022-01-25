const express = require('express');
const app = express();

const database = [
  { id: 1, title: '글1' },
  { id: 2, title: '글2' },
  { id: 3, title: '글3' },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/database', (req, res) => {
  res.send(database);
});

app.get('/database/:id', (req, res) => {
  const id = req.params.id; // string
  const data = database.find(el => el.id === Number(id));
  res.send(data);
});

app.post('/database', (req, res) => {
  const title = req.body.title;
  database.push({
    id: database.length + 1,
    title,
  });
  res.send('값 추가 완료');
});

app.put('/database', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  database[id - 1].title = title;
  res.send('값 수정 완료');
});

app.delete('/database/:id', (req, res) => {
  const id = req.params.id;
  database.splice(id - 1, 1);
  res.send('값 삭제 완료');
});

app.listen(3000, () => {
  console.log('server on!');
});
