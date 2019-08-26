const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const databaseUrl = process.env.DATABASE_URL || 'mongodb://35.231.106.182/';

console.log('================ LOCAL BANCO', databaseUrl);

const app = express();

app.get('/', (req, res) => {
  MongoClient.connect(databaseUrl, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;

    const dbo = db.db('iv2-makeiteasy');
    
    dbo.collection('customers').find({}).toArray((err, result) => {
      if (err) throw err;
      
      res.send(result);
      db.close();
    });
  });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
