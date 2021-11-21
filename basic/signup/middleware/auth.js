const jwt = require('jsonwebtoken');
const database = require('../data');

const validUser = (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    res.status(401).send('access token 없음');
  }

  try {
    const { username } = jwt.verify(access_token, 'secure');
    const userInfo = database.find(user => user.username === username);

    if (!userInfo) {
      throw new Error('userInfo 없음');
    }

    next();
  } catch (e) {
    console.error(e);
    res.status(401).send('유효한 access token이 없습니다.');
  }
};

module.exports = {
  validUser,
};
