const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { validUser } = require('./middleware/auth');
const database = require('./data');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/users', (req, res) => {
  res.send(database);
});

app.get('/secure_data', validUser, (req, res) => {
  res.send('secure data');
});

app.post('/signup', async (req, res) => {
  const { username, password, age, birth } = req.body;
  const hash = await argon2.hash(password);

  database.push({
    username,
    password: hash,
    age,
    birth,
  });
  res.send('success');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = database.filter(user => user.username === username);

  if (user.length === 0) {
    res.status(403).send('해당하는 user가 없습니다.');
    return;
  }

  if (!(await argon2.verify(user[0].password, password))) {
    res.status(403).send('패스워드가 일치하지 않습니다.');
    return;
  }

  const access_token = jwt.sign({ username }, 'secure');
  console.log(access_token);
  res.cookie('access_token', access_token, { httpOnly: true });
  res.send('로그인 성공');
});

app.listen(3000, () => {
  console.log('server on!');
});
