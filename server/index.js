const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const session = require('express-session');
const userRouter = require('./routes/userRouter');
const foodRouter = require('./routes/foodRouter')

const app = express();
connectDb();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    })
  );
app.get('/',(req,res)=>{
    res.send('hello world');
})


app.use('/api/users',userRouter);
app.use('/api/food',foodRouter)

app.listen(port, () => {
    console.log(`Server connected on port ${port}`);
  })