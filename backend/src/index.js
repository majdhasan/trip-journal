const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const v1 = require('./api/v1');

// import own middlewares
const middlewares = require('./middlewares');

// initalize Express App
const app = express();

// ------------ Connect to DB ---------

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connection to the DB has been successfuly established');
  },
);

// ------------ Middleware ------------
app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------- Routes --------------

app.use('/api/v1', v1);

// ---------- 404 Route Handling ---------
app.use(middlewares.notFound);

// ----------- Error Handling ---------
app.use(middlewares.errorHandler);

// ----------- Start Server ---------
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App started on port http://localhost:${port}`);
});
