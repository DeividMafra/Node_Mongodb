const express = require('express');
const mongo = require('mongodb');
const app = express();
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";


// 1. Write nodejs code to connect to your mongoDB database and list down all the collections from you database. (1 mark)
app.get('/api/collections', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    dbo.listCollections().toArray(function (err, collInfos) {
      console.log(collInfos);
      return res.json(collInfos);
    });
  });
});

// 2. Create at least two or more GET services which will read data from your database collections. (2 marks)
// 1/3
app.get('/api/student', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    // with the command projection you can define which fields you wanna show
    dbo.collection("student").find({}, { projection: { _id: 0, firstName: 1, lastName: 1 } }).toArray(function (err, result) {
      // dbo.collection("student").find({}, { _id: 0, firstName: 1, lastName: 1 }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

// 2/3
app.get('/api/activity', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    dbo.collection("activity").find({}, { name: 1 }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close()
    });
  });
});

// 3/3
app.get('/api/class', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    dbo.collection("class").find({}, { projection: { _id: 0, room: 1, floor: 1 } }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});


// 3. Create at least two or more GET services with parameters which will read data from your database collections based on parameter. (1 mark)
// 1/3
app.get('/api/student/:firstName', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    var firstName = req.params.firstName;
    dbo.collection("student").find({ firstName: firstName }, { _id: 0, firstName: 1, lastName: 1 }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

// 2/3
app.get('/api/programs/:programId', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    var programId = req.params.programId;
    dbo.collection("programs").find({ programId: programId }, { _id: 0, programId: 1, programName: 1, room: 1 }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

// 3/3
app.get('/api/teacher/:teacherId', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    var teacherId = req.params.teacherId;
    dbo.collection("teacher").find({ teacherId: teacherId }, { _id: 0, teacherId: 1, firstName: 1, email: 1 }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

// 4. Write PUT Service to update at least 2 collections. (2 mark)
// 1/3 - updating the teacher first name, last name, and email address by id.
app.put('/api/teacher/:teacherId', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    var teacherId = req.params.teacherId;

    const data = {
      firstName,
      lastName,
      email,
    } = req.body;

    dbo.collection("teacher").updateOne({ teacherId: teacherId }, { $set: data }, (function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(data);// how to get the data updated in an easy way????
      db.close();
    }));
  });
});

// 2/3 - updating the programs room by id.
app.put('/api/programs/:programId', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    var programId = req.params.programId;

    const data = { room } = req.body;

    dbo.collection("programs").updateOne({ programId: programId }, { $set: data }, (function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(data);// how to get the data updated in an easy way????
      db.close();
    }));
  });
});

// 3/3 - updating the grade value based on the letter (A+, A, A- ...).
app.put('/api/grade/:garedLetter', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    var garedLetter = req.params.garedLetter;

    const data = { gradeNumber } = req.body;

    dbo.collection("grade").updateOne({ garedLetter: garedLetter }, { $set: data }, (function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(data); // how to get the data updated in an easy way????
      db.close();
    }));
  });
});



// 5. Write POST Service to insert documents in at least 2 collections. (2 mark)
// 1/3
app.post('/api/student', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    // insert one object
    var myobj = {
      firstName,
      lastName,
      program,
      age
    } = req.body;

    // insert many object
    // var myobj = [{ firstName: "FirstName New", lastName: "LastName New" }, { firstName: "FirstName New Student3", lastName: "LastName New Student3" }];
    // dbo.collection("student").insertMany(myobj, function (err, result) {

    // insert one object
    dbo.collection("student").insertOne(myobj, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200);
      res.send(result.ops);
      db.close();
    });
  });
});

// 2/3
app.post('/api/programs', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");

    var myobj = {
      programId,
      programName,
      room
    } = req.body;

    dbo.collection("programs").insertOne(myobj, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200);
      res.send(result.ops);
      db.close();
    });
  });
});

// 3/3
app.post('/api/teacher', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");

    var myobj = {
      teacherId,
      firstName,
      lastName,
      email,
      courses
    } = req.body;

    dbo.collection("teacher").insertOne(myobj, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200);
      res.send(result.ops);
      db.close();
    });
  });
});


// 6. Write Delete Service to delete documents in at least 2 collections. (2 mark)
// 1/3
app.delete('/api/teacher/:teacherId', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    var teacherId = req.params.teacherId;

    dbo.collection("teacher").remove({ teacherId: teacherId }, true, (function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(200);
      db.close();
    }));
  });
});

// 2/3
app.delete('/api/programs/:programId', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    var programId = req.params.programId;

    dbo.collection("programs").remove({ programId: programId }, true, (function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(200);
      db.close();
    }));
  });
});

// 3/3
app.delete('/api/grade/:garedLetter', (req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Assignment1");
    var garedLetter = req.params.garedLetter;

    dbo.collection("grade").remove({ garedLetter: garedLetter }, true, (function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(200);
      db.close();
    }));
  });
});


//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));