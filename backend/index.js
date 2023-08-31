const connectToMongo= require('./db');
const cors=require('cors');

connectToMongo();
const express = require('express')
const app = express()
const port = 3005
app.use(cors())
app.use(express.json())
//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
