const express = require('express')
const router = express.Router()
const template = require('../lib/template.js')

function authIsOwner(req, res){
  if(req.session.is_logged_in){
    return true;
  } else {
    return false;
  }
}

function authStatusUI(req, res) {
  let authStatusUI = '<a href="/auth/login">login</a>'
  if(authIsOwner(req, res)){
    authStatusUI = `<a href="/auth/logout">${req.session.nickname} logout</a>`
  }

  return authStatusUI;
}

router.get('/', (req, res) => {
  
  const title = 'Welcome'
  const description = 'Hello, Node.js'
  const list = template.list(req.list)
  const html = template.HTML(title, list,
    `
      <h2>${title}</h2>${description}
      <img style="display:block;max-width:370px;margin-top:25px;" src="/images/elia.jpg" />
    `,
    `<a href="/topic/create">create</a>`,
    authStatusUI(req, res)
  )
  res.send(html)
});

module.exports = router;