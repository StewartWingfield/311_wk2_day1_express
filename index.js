
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
  const { userId } = req.params
  const updatedUserData = req.body

  const userIndex = users.findIndex((user) => user._id === userId)

  if (userIndex === -1) {
    return res.json('User not found')
  }
  users[userIndex] = { ...users[userIndex], ...updatedUserData }

  res.send('User updated successfully')
})

app.delete('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)

  const userIndex = users.findIndex((user) => user.id === userId)

  if (userIndex === -1) {
    return res.send('User not found')
  }
  users[userIndex].isActive = false
  res.send('Deleted')
});



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))