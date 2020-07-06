const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const sanitizeHtml = require('sanitize-html')
const template = require('../lib/template.js')
const authData = require('../password.js')
const { request } = require('https')

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
    res.redirect(`/`);
  }else {
    res.send('Who are you?')
  }

});

module.exports = router;

/*

router.get('/update/:pageId', (req, res) => {
  const filteredId = path.parse(req.params.pageId).base
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    const title = req.params.pageId
    const list = template.list(req.list)
    const html = template.HTML(title, list,
      `
      <form action="/topic/update" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
      `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
    );
    res.send(html);
  });
});

router.post('/update', (req, res) => {
  const post = req.body
  const id = post.id
  const title = post.title
  const description = post.description
  fs.rename(`data/${id}`, `data/${title}`, function(err){
    fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
      res.redirect(`/topic/${title}`);
    })
  });
});

router.post('/delete', (req, res) => {
  const post = req.body
  const id = post.id
  const filteredId = path.parse(id).base
  fs.unlink(`data/${filteredId}`, (err) => {
    res.redirect(`/`);
  })
});

router.get('/:pageId', (req, res, next) => {
  const filteredId = path.parse(req.params.pageId).base
  fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
    if(err) next(err);
    const title = req.params.pageId;
    const sanitizedTitle = sanitizeHtml(title);
    const sanitizedDescription = sanitizeHtml(description, {
      allowedTags:['h1']
    });
    const list = template.list(req.list)
    const html = template.HTML(sanitizedTitle, list,
      `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
      ` <a href="/topic/create">create</a>
        <a href="/topic/update/${sanitizedTitle}">update</a>
        <form action="/topic/delete" method="post">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
        </form>`
    );
    res.send(html)
  });
});

module.exports = router;
*/