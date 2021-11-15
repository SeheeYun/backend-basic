const express = require('express');
const app = express();

const database = [
  { id: 1, title: '글1' }, // id is number
  { id: 2, title: '글2' },
  { id: 3, title: '글3' },
];

// body parser
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

//use params
// app.get('/database/:title', (req, res) => {
//   const title = req.params.title;
//   database.push({
//     id: database.length + 1,
//     title,
//   });
//   res.send('값 추가 완료');
// });

//use request body
app.post('/add-database', (req, res) => {
  const title = req.body.title;
  database.push({
    id: database.length + 1,
    title,
  });
  res.send('값 추가 완료');
});

app.post('/update-database', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  database[id - 1].title = title; // index is 'id: database.length + 1'
  res.send('값 수정 완료');
});

app.post('/delete-database', (req, res) => {
  const id = req.body.id;
  database.splice(id - 1, 1);
  res.send('값 삭제 완료');
});

// CRUD를 url로 구분 할 수 있지만, http 메서드를 이용해서 표현한 것이 RESTful API
// create: POST / read: GET / update: PUT,PATCH / delete: DELETE
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

app.delete('/database', (req, res) => {
  const id = req.body.id;
  database.splice(id - 1, 1);
  res.send('값 삭제 완료');
});

app.listen(3000, () => {
  console.log('server on!');
});
