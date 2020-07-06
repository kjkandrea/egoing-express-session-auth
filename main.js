const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const compression = require('compression')
const helmet = require('helmet')
const session = require('express-session')
var FileStore = require('session-file-store')(session)
const authData = require('./password.js')

app.use(helmet())

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(compression())
app.use(session({
  secret: authData.secret.sessionKey,
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

// middleware
app.get('*', (req, res, next) => {
  fs.readdir('./data', (err, filelist) => {
    req.list = filelist;
    next();
  });
})

// route, routing

const indexRouter = require('./routes/index')
const topicRouter = require('./routes/topic')
const authRouter = require('./routes/auth')

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.status(404).send('Sorry. cant find that!')
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('권한이 없습니다.');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

