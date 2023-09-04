
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

let { users } = require('./state')

app.use(express.json())

/* BEGIN - create routes here */

app.get('/users', (req, res) => {
  
  res.json(users)
})

app.get('/users/:userId', (req, res) => {
 

  const userId = req.params.userId

  res.json(users[userId - 1])
})

app.post('/users', (req, res) => {

  const newUser = {
    ...req.body,
    _id: users.length + 1
  }
  users.push(newUser)

  res.json(newUser)
})

app.put('/users/:userId', (req, res) => {

})

app.delete('users/:userId', (req, res) => {
  const userId = req.params.userId

  let user = users[userId - 1]
  user.isActive = false
  res.json(user)
})



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))