const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const sanitizeHtml = require('sanitize-html')
const template = require('../lib/template.js')
const authData = require('../password.js')

router.get('/login', (req, res) => {
  const title = 'WEB - login';
  const list = template.list(req.list)
  const html = template.HTML(title, list, `
    <form action="/auth/login_process" method="post">
      <p><input type="email" name="email" placeholder="email"></p>
      <p><input type="password" name="password" placeholder="password"></p>
      <p>
        <input type="submit" value="login">
      </p>
    </form>
  `, '');
  res.send(html);
});

router.post('/login_process', (req, res) => {
  const post = req.body;
  const email = post.email;
  const password = post.password;

  if(email === authData.admin.email && password === authData.admin.password){
    req.session.is_logged_in = true
    req.session.nickname = authData.admin.nickname
    req.session.save(() => {
      res.redirect(`/`);
    });
  }else {
    res.send('Who are you?')
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/')
  })
});

module.exports = router;