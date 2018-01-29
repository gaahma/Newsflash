const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./routes/userRoutes.js')(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('*', function(req, res){    //send the client application for all non-api calls
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/newsflash' , 
  { useMongoClient: true }
);
var db = mongoose.connection;

db.on("error", (error) => console.log("Mongoose Error: ", error));

db.once("open", function() {
  console.log("Mongoose connection successful.");
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});