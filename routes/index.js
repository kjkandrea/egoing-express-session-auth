const express = require('express')
const router = express.Router()
const template = require('../lib/template.js')
const auth = require('../lib/auth')

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
    auth.StatusUI(req, res)
  )
  res.send(html)
});

module.exports = router;