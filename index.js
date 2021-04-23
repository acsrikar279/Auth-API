const express = require('express');
const app = express();
const authRoute = require('./routes/auth')
const mongoose = require('mongoose');
const dotenv =  require('dotenv')

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true}, ()=> console.log('Connected to DB!'));

app.use(express.json());

app.use('/api/user', authRoute);

app.listen(3000, ()=> console.log('Server started at 3000'));
